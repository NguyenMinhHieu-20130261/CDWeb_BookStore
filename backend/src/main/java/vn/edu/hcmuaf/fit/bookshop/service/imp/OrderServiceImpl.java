package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;

import vn.edu.hcmuaf.fit.bookshop.dto.request.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.repository.*;
import vn.edu.hcmuaf.fit.bookshop.service.OrderService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;
    private final CartRepo cartRepo;
    private final AddressRepo addressRepo;
    private final OrderStatusRepo orderStatusRepo;
    private final PromotionRepo promotionRepo;
    private final ProductRepo productRepo;
    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;


    @jakarta.annotation.PostConstruct
    public void init() {
        try {
            // Drop unique constraint on order status
            jdbcTemplate.execute("ALTER TABLE orders DROP FOREIGN KEY FK1179a4yhelei7ibvnyd8okhqu");
            jdbcTemplate.execute("ALTER TABLE orders DROP INDEX UK_qro50btxtakk2eg9v13c1se48");
            jdbcTemplate.execute("ALTER TABLE orders ADD CONSTRAINT FK1179a4yhelei7ibvnyd8okhqu FOREIGN KEY (status) REFERENCES order_status (id)");
            System.out.println("Successfully modified orders status constraint from unique to non-unique.");
        } catch (Exception e) {
            // Already modified or index doesn't exist, ensure foreign key is present
            try {
                jdbcTemplate.execute("ALTER TABLE orders ADD CONSTRAINT FK1179a4yhelei7ibvnyd8okhqu FOREIGN KEY (status) REFERENCES order_status (id)");
            } catch (Exception ex) {
                // Foreign key already exists, all good
            }
        }

        try {
            // Find and drop unique index/constraint on discount_id in orders table to support @ManyToOne
            List<String> indexNames = jdbcTemplate.queryForList(
                    "SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'orders' AND COLUMN_NAME = 'discount_id' AND NON_UNIQUE = 0",
                    String.class
            );
            if (!indexNames.isEmpty()) {
                // Find foreign key constraint names on discount_id column
                List<String> fkNames = jdbcTemplate.queryForList(
                        "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'orders' AND COLUMN_NAME = 'discount_id' AND REFERENCED_TABLE_NAME IS NOT NULL",
                        String.class
                );

                // 1. Drop foreign key constraints first
                for (String fkName : fkNames) {
                    try {
                        jdbcTemplate.execute("ALTER TABLE orders DROP FOREIGN KEY " + fkName);
                        System.out.println("Dropped foreign key constraint " + fkName + " on orders(discount_id).");
                    } catch (Exception ex) {
                        System.err.println("Could not drop foreign key " + fkName + ": " + ex.getMessage());
                    }
                }

                // 2. Drop unique index
                for (String indexName : indexNames) {
                    try {
                        jdbcTemplate.execute("ALTER TABLE orders DROP INDEX " + indexName);
                        System.out.println("Dropped unique index " + indexName + " on orders(discount_id).");
                    } catch (Exception ex) {
                        System.err.println("Could not drop index " + indexName + ": " + ex.getMessage());
                    }
                }

                // 3. Re-add foreign key constraint referencing promotions(id)
                try {
                    jdbcTemplate.execute("ALTER TABLE orders ADD CONSTRAINT FK_orders_discount_id FOREIGN KEY (discount_id) REFERENCES promotions (id)");
                    System.out.println("Successfully re-added foreign key constraint FK_orders_discount_id referencing promotions(id).");
                } catch (Exception ex) {
                    System.err.println("Could not re-add foreign key constraint: " + ex.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("Error dropping unique constraint on discount_id: " + e.getMessage());
        }
    }

    public List<Order> getOrdersByUser_Id(Integer userId, String sort) {
        Sort orderSort;
        if ("oldest".equalsIgnoreCase(sort)) {
            orderSort = Sort.by(Sort.Direction.ASC, "orderDate");
        } else {
            orderSort = Sort.by(Sort.Direction.DESC, "orderDate");
        }
        return orderRepo.findByUser_Id(userId, orderSort);
    }

    @Override
    public Order getOrderDetail(Integer orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
    }

    @Override
    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        if (orderRequest.getUserId() == null) {
            throw new RuntimeException("User ID không được để trống");
        }
        User user = userRepo.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        List<Cart> cartItems = cartRepo.findByUserId(orderRequest.getUserId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Giỏ hàng của bạn đang trống");
        }

        // 1. Tạo và lưu địa chỉ giao hàng mới
        Address address = Address.builder()
                .user(user)
                .fullName(orderRequest.getFullName())
                .phoneNumber(orderRequest.getPhoneNumber())
                .detailAdrs(orderRequest.getDetailAdrs())
                .provinceCity(orderRequest.getProvinceCity())
                .countyDistrict(orderRequest.getCountyDistrict())
                .wardCommune(orderRequest.getWardCommune())
                .wardCode(orderRequest.getWardCode())
                .districtId(orderRequest.getDistrictId())
                .isDefault(false)
                .build();
        address = addressRepo.save(address);

        // 2. Tạo đơn hàng mới
        Order order = new Order();
        String orderCode = "ORD-" + System.currentTimeMillis() + "-" + (int) (Math.random() * 1000);
        order.setOrderCode(orderCode);
        order.setUser(user);
        order.setShippingAddress(address);
        order.setOrderDate(new Date());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setNote(orderRequest.getNote());
        order.setShippingCost(0);

        OrderStatus defaultStatus = orderStatusRepo.findById(1).orElse(null);
        if (defaultStatus == null) {
            if (orderStatusRepo.count() == 0) {
                OrderStatus s1 = new OrderStatus();
                s1.setId(1);
                s1.setSlug("pending");
                s1.setName("Đang chờ xử lý");
                orderStatusRepo.save(s1);

                OrderStatus s2 = new OrderStatus();
                s2.setId(2);
                s2.setSlug("confirmed");
                s2.setName("Đã xác nhận");
                orderStatusRepo.save(s2);

                OrderStatus s3 = new OrderStatus();
                s3.setId(3);
                s3.setSlug("preparing");
                s3.setName("Đang chuẩn bị");
                orderStatusRepo.save(s3);

                OrderStatus s4 = new OrderStatus();
                s4.setId(4);
                s4.setSlug("shipping");
                s4.setName("Đang giao");
                orderStatusRepo.save(s4);

                OrderStatus s5 = new OrderStatus();
                s5.setId(5);
                s5.setSlug("delivered");
                s5.setName("Đã giao");
                orderStatusRepo.save(s5);

                OrderStatus s6 = new OrderStatus();
                s6.setId(6);
                s6.setSlug("cancelled");
                s6.setName("Đơn hàng đã hủy");
                orderStatusRepo.save(s6);
                
                defaultStatus = s1;
            } else {
                defaultStatus = orderStatusRepo.findAll().get(0);
            }
        }
        order.setStatus(defaultStatus);

        // 3. Tạo chi tiết đơn hàng
        List<OrderDetail> orderDetails = new ArrayList<>();
        int orderTotal = 0;
        int totalQuantity = 0;

        for (Cart item : cartItems) {
            Product product = item.getProduct();
            int qty = item.getQuantity();
            OrderDetail detail = new OrderDetail(order, product, qty);
            orderDetails.add(detail);

            orderTotal += product.getCurrentPrice() * qty;
            totalQuantity += qty;
        }

        order.setOrderDetails(orderDetails);
        
        if (orderRequest.getPromotionId() != null) {
            Promotion promotion = promotionRepo.findById(orderRequest.getPromotionId())
                    .orElseThrow(() -> new RuntimeException("Mã giảm giá không tồn tại hoặc đã bị xóa"));

            if (promotion.getStatus() == null || !promotion.getStatus()) {
                throw new RuntimeException("Mã giảm giá đã ngưng hoạt động");
            }

            Date now = new Date();
            if (promotion.getStartDate() != null && now.before(promotion.getStartDate())) {
                throw new RuntimeException("Mã giảm giá chưa đến thời hạn sử dụng");
            }
            if (promotion.getEndDate() != null && now.after(promotion.getEndDate())) {
                throw new RuntimeException("Mã giảm giá đã hết hạn sử dụng");
            }

            boolean alreadyUsed = orderRepo.existsByUser_IdAndPromotion_Id(user.getId(), promotion.getId());
            if (alreadyUsed) {
                throw new RuntimeException("Bạn đã sử dụng mã giảm giá này cho một đơn hàng trước đó");
            }

            double discountPercent = promotion.getDiscountPercent() != null ? promotion.getDiscountPercent().doubleValue() : 0.0;
            int discountAmount = (int) Math.round(orderTotal * (discountPercent / 100.0));
            orderTotal = Math.max(0, orderTotal - discountAmount);
            order.setPromotion(promotion);

            promotion.setUsageCount((promotion.getUsageCount() != null ? promotion.getUsageCount() : 0) + 1);
            promotionRepo.save(promotion);
        }

        order.setOrderTotal(orderTotal);
        order.setTotalQuantity(totalQuantity);

        Order savedOrder = orderRepo.save(order);

        // 4. Xóa giỏ hàng
        cartRepo.deleteAll(cartItems);

        return savedOrder;
    }

    @Override
    @Transactional
    public Order cancelOrder(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        OrderStatus cancelledStatus = orderStatusRepo.findById(6)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái hủy đơn hàng"));

        order.setStatus(cancelledStatus);
        return orderRepo.save(order);
    }

    @Override
    public Page<Order> getAllOrders(int page, int perPage, String sort, String filter, String order) {
        Sort.Direction direction = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        if (filter == null || filter.isEmpty() || "{}".equals(filter)) {
            return orderRepo.findAll(pageable);
        }

        return orderRepo.findAll((root, query, cb) -> {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree(filter);
                List<Predicate> predicates = new ArrayList<>();

                if (json.has("status") && !json.get("status").asText().isBlank()) {
                    String statusVal = json.get("status").asText();
                    try {
                        Integer statusId = Integer.parseInt(statusVal);
                        predicates.add(cb.equal(root.get("status").get("id"), statusId));
                    } catch (NumberFormatException e) {
                        predicates.add(cb.equal(root.get("status").get("slug"), statusVal));
                    }
                }
                if (json.has("orderCode") && !json.get("orderCode").asText().isBlank()) {
                    String orderCode = json.get("orderCode").asText().toLowerCase();
                    predicates.add(cb.like(cb.lower(root.get("orderCode")), "%" + orderCode + "%"));
                }

                if (json.has("q") && !json.get("q").asText().isBlank()) {
                    String q = json.get("q").asText().toLowerCase();
                    predicates.add(cb.or(
                        cb.like(cb.lower(root.get("orderCode")), "%" + q + "%"),
                        cb.like(cb.lower(root.get("paymentMethod")), "%" + q + "%"),
                        cb.like(cb.lower(root.get("user").get("username")), "%" + q + "%"),
                        cb.like(cb.lower(root.get("shippingAddress").get("fullName")), "%" + q + "%")
                    ));
                }

                return cb.and(predicates.toArray(new Predicate[0]));
            } catch (Exception e) {
                return cb.conjunction();
            }
        }, pageable);
    }

    @Override
    @Transactional
    public Order updateOrder(Integer id, Order updatedOrder) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (updatedOrder.getShippingAddress() == null) {
            throw new RuntimeException("Địa chỉ giao hàng không được để trống");
        }
        if (updatedOrder.getShippingAddress().getFullName() == null || updatedOrder.getShippingAddress().getFullName().trim().isEmpty()) {
            throw new RuntimeException("Tên người mua không được để trống");
        }
        if (updatedOrder.getPaymentMethod() == null || updatedOrder.getPaymentMethod().trim().isEmpty()) {
            throw new RuntimeException("Phương thức thanh toán không được để trống");
        }
        if (updatedOrder.getStatus() == null || updatedOrder.getStatus().getId() == null) {
            throw new RuntimeException("Trạng thái đơn hàng không được để trống");
        }

        // Update shipping address
        Address address = order.getShippingAddress();
        if (address == null) {
            address = new Address();
            address.setUser(order.getUser());
        }
        Address updatedAddr = updatedOrder.getShippingAddress();
        address.setFullName(updatedAddr.getFullName().trim());
        address.setPhoneNumber(updatedAddr.getPhoneNumber());
        address.setDetailAdrs(updatedAddr.getDetailAdrs());
        address.setProvinceCity(updatedAddr.getProvinceCity());
        address.setCountyDistrict(updatedAddr.getCountyDistrict());
        address.setWardCommune(updatedAddr.getWardCommune());
        address = addressRepo.save(address);
        order.setShippingAddress(address);

        // Update status
        OrderStatus status = orderStatusRepo.findById(updatedOrder.getStatus().getId())
                .orElseThrow(() -> new RuntimeException("Trạng thái đơn hàng không tồn tại"));
        order.setStatus(status);

        // Update other fields
        order.setPaymentMethod(updatedOrder.getPaymentMethod().trim());
        order.setNote(updatedOrder.getNote());

        // Update promotion if provided
        if (updatedOrder.getPromotion() != null && updatedOrder.getPromotion().getId() != null) {
            Promotion promotion = promotionRepo.findById(updatedOrder.getPromotion().getId()).orElse(null);
            order.setPromotion(promotion);
        } else {
            order.setPromotion(null);
        }

        // Update order details
        if (updatedOrder.getOrderDetails() != null) {
            // Clear existing details (relying on orphanRemoval=true to delete from database)
            order.getOrderDetails().clear();
            
            // Build the new list of details
            List<OrderDetail> newDetails = new ArrayList<>();
            for (OrderDetail item : updatedOrder.getOrderDetails()) {
                if (item.getProduct() == null || item.getProduct().getId() == null) {
                    throw new RuntimeException("Sản phẩm không hợp lệ trong đơn hàng");
                }
                Product product = productRepo.findById(item.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID " + item.getProduct().getId()));

                OrderDetail detail = new OrderDetail();
                detail.setOrder(order);
                detail.setProduct(product);
                
                int quantity = item.getQuantity() > 0 ? item.getQuantity() : 1;
                detail.setQuantity(quantity);
                
                if (item.getTotalMoney() > 0) {
                    detail.setTotalMoney(item.getTotalMoney());
                } else {
                    detail.setTotalMoney(product.getCurrentPrice() * quantity);
                }
                
                newDetails.add(detail);
            }
            order.getOrderDetails().addAll(newDetails);
        }

        // Re-calculate totals
        int totalQty = 0;
        int totalMoney = 0;
        for (OrderDetail detail : order.getOrderDetails()) {
            totalQty += detail.getQuantity();
            totalMoney += detail.getTotalMoney();
        }

        if (order.getPromotion() != null) {
            double discountPercent = order.getPromotion().getDiscountPercent() != null 
                    ? order.getPromotion().getDiscountPercent().doubleValue() 
                    : 0.0;
            int discountAmount = (int) Math.round(totalMoney * (discountPercent / 100.0));
            totalMoney = Math.max(0, totalMoney - discountAmount);
        }

        order.setTotalQuantity(totalQty);
        order.setOrderTotal(totalMoney);

        return orderRepo.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Integer id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        Address address = order.getShippingAddress();
        orderRepo.delete(order);
        if (address != null) {
            addressRepo.delete(address);
        }
    }
}

