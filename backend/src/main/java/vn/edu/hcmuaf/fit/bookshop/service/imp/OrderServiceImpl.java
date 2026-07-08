package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderReplyRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;

import vn.edu.hcmuaf.fit.bookshop.service.NotificationService;
import vn.edu.hcmuaf.fit.bookshop.service.OrderService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;
    private final CartRepo cartRepo;
    private final AddressRepo addressRepo;
    private final OrderStatusRepo orderStatusRepo;
    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;
    
    @Autowired
    private SystemLogService systemLogService;

    @Autowired
    private NotificationService notificationService;

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
    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        log.info("Bắt đầu tạo đơn hàng cho user {}",orderRequest.getUserId());
        if (orderRequest.getUserId() == null) {
            throw new RuntimeException("User ID không được để trống");
        }
        User user = userRepo.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        List<Cart> cartItems = cartRepo.findByUserId(orderRequest.getUserId());
        log.debug("User {} có {} sản phẩm trong giỏ",user.getId(),cartItems.size());
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
        order.setOrderTotal(orderTotal);
        order.setTotalQuantity(totalQuantity);

        Order savedOrder = orderRepo.save(order);
        //notify
        notificationService.createForUser(
            user.getId(),
            NotificationType.ORDER,
            "Đặt hàng thành công",
            "Đơn hàng " + savedOrder.getOrderCode() + " đã được tạo thành công",
            "/user/orders/" + savedOrder.getId()
        );
        notificationService.createBroadcast(
            NotificationType.ORDER,
            "Có đơn hàng mới",
            "User " + user.getUsername() + " vừa đặt đơn " + savedOrder.getOrderCode(),
            "/admin/orders/" + savedOrder.getId()
        );
        log.info(
            "Đơn hàng {} được tạo thành công, tổng tiền={}, số lượng={}",
            savedOrder.getOrderCode(),
            savedOrder.getOrderTotal(),
            savedOrder.getTotalQuantity()
        );
        // 4. Xóa giỏ hàng
        // cartRepo.deleteAll(cartItems);
        // log.debug(
        //     "Đã xóa {} sản phẩm khỏi giỏ hàng user {}",
        //     cartItems.size(),
        //     user.getId()
        // );
        systemLogService.saveLog(
            "USER_ORDER",
            "INFO",
            "USER đặt đơn hàng đơn hàng có id = " + order.getId() + ", username = " + order.getUser(),
            null,
            "USER"
        );
        return savedOrder;
    }

    @Override
    @Transactional
    public Order cancelOrderForUser(Integer orderId, Integer userId) {
        log.info(
            "User {} yêu cầu hủy đơn {}",
            userId,
            orderId
        );
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền hủy đơn hàng này");
        }

        if (!"pending".equals(order.getStatus().getSlug())) {
            throw new RuntimeException("Chỉ có thể hủy đơn hàng đang chờ xử lý");
        }

        OrderStatus cancelledStatus = orderStatusRepo.findById(6)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái hủy đơn hàng"));

        order.setStatus(cancelledStatus);
        notificationService.createBroadcast(
            NotificationType.ORDER,
            "Đơn hàng bị hủy",
            "User " + order.getUser().getUsername() + " đã hủy đơn " + order.getOrderCode(),
            "/admin/orders/" + order.getId()
        );
        log.info(
            "Đơn {} đã bị hủy",
            orderId
        );
        systemLogService.saveLog(
            "CANCEL_ORDER",
            "INFO",
            "USER cập nhật trạng thái đơn hàng có id = " + order.getId() + ", username = " + order.getUser(),
            null,
            "USER"
        );
        return orderRepo.save(order);
    }
    //admin
    @Override
    public Page<Order> getAllOrders(int page, int perPage, String sort, String filter, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        if (filter == null || filter.isEmpty() || filter.equals("{}")) {
            return orderRepo.findAll(pageable);
        }

        return orderRepo.findAll((root, query, cb) -> {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree(filter);
                List<Predicate> predicates = new ArrayList<>();

                if (json.has("id") && !json.get("id").asText().isBlank()) {
                    try {
                        Integer orderId = Integer.parseInt(json.get("id").asText().trim());
                        predicates.add(cb.equal(root.get("id"), orderId));
                    } catch (NumberFormatException ignored) {}
                }

                if (json.has("q") && !json.get("q").asText().isBlank()) {
                    String q = json.get("q").asText().toLowerCase().trim();
                    
                    var userJoin = root.join("user", jakarta.persistence.criteria.JoinType.LEFT);
                    var addrJoin = root.join("shippingAddress", jakarta.persistence.criteria.JoinType.LEFT);
                    
                    List<Predicate> qPredicates = new ArrayList<>();
                    qPredicates.add(cb.like(cb.lower(root.get("orderCode")), "%" + q + "%"));
                    qPredicates.add(cb.like(cb.lower(addrJoin.get("fullName")), "%" + q + "%"));
                    qPredicates.add(cb.like(cb.lower(userJoin.get("username")), "%" + q + "%"));
                    qPredicates.add(cb.like(cb.lower(userJoin.get("email")), "%" + q + "%"));
                    
                    try {
                        Integer qId = Integer.parseInt(q);
                        qPredicates.add(cb.equal(root.get("id"), qId));
                    } catch (NumberFormatException ignored) {}
                    
                    predicates.add(cb.or(qPredicates.toArray(new Predicate[0])));
                }

                if (json.has("fullName") && !json.get("fullName").asText().isBlank()) {
                    String fullName = json.get("fullName").asText().toLowerCase().trim();
                    var addrJoin = root.join("shippingAddress", jakarta.persistence.criteria.JoinType.LEFT);
                    predicates.add(cb.like(cb.lower(addrJoin.get("fullName")), "%" + fullName + "%"));
                }

                if (json.has("orderCode") && !json.get("orderCode").asText().isBlank()) {
                    String orderCode = json.get("orderCode").asText().toLowerCase().trim();
                    predicates.add(cb.like(cb.lower(root.get("orderCode")), "%" + orderCode + "%"));
                }

                if (json.has("statusId") && !json.get("statusId").asText().isBlank()) {
                    try {
                        Integer statusId = Integer.parseInt(json.get("statusId").asText().trim());
                        var statusJoin = root.join("status", jakarta.persistence.criteria.JoinType.LEFT);
                        predicates.add(cb.equal(statusJoin.get("id"), statusId));
                    } catch (NumberFormatException ignored) {}
                }

                return cb.and(predicates.toArray(new Predicate[0]));
            } catch (Exception e) {
                return cb.conjunction();
            }
        }, pageable);
    }

    @Override
    public Order getOrderById(Integer id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
    }
    
    @Override
    public Order updateOrderStatus(Integer id, Integer statusId) {
        log.info(
            "Admin cập nhật trạng thái đơn {} -> {}",
            id,
            statusId
        );
        Order existing = getOrderById(id);
        OrderStatus status = orderStatusRepo.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái"));
        existing.setStatus(status);
        log.info(
            "Đơn {} cập nhật trạng thái thành công",
            id
        );
        notificationService.createForUser(
        existing.getUser().getId(),
            NotificationType.ORDER,
            "Cập nhật đơn hàng",
            "Đơn hàng " + existing.getOrderCode() + " chuyển sang trạng thái: " + status.getName(),
            "/user/orders/" + existing.getId()
        );
        systemLogService.saveLog(
            "DELETE_ORDER",
            "INFO",
            "ADMIN cập nhật trạng thái đơn hàng có id = " + existing.getId() + ", username = " + existing.getUser(),
            null,
            "ADMIN"
        );
        return orderRepo.save(existing);
    }
    @Override
    public Order getOrderDetailForUser(Integer orderId, Integer userId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền xem đơn hàng này");
        }

        return order;
    }

    @Override
    @Transactional
    public Order updateOrder(Integer id, Map<String, Object> body) {
        Order existing = getOrderById(id);
        log.info("Admin cập nhật đơn {}", id);
        if (body.containsKey("orderTotal")) {
            existing.setOrderTotal(Integer.parseInt(body.get("orderTotal").toString()));
        }
        if (body.containsKey("totalQuantity")) {
            existing.setTotalQuantity(Integer.parseInt(body.get("totalQuantity").toString()));
        }
        if (body.containsKey("paymentMethod")) {
            existing.setPaymentMethod((String) body.get("paymentMethod"));
        }
        if (body.containsKey("note")) {
            existing.setNote((String) body.get("note"));
        }
        if (body.containsKey("shopReply")) {
            existing.setShopReply((String) body.get("shopReply"));
        }
        notificationService.createForUser(
        existing.getUser().getId(),
            NotificationType.ORDER,
            "Shop đã phản hồi đơn hàng",
            "Shop đã phản hồi đơn hàng " + existing.getOrderCode(),
            "/user/orders/" + existing.getId()
        );
        // status
        if (body.containsKey("status")) {
            Object statusObj = body.get("status");
            if (statusObj instanceof Map) {
                Map<?, ?> statusMap = (Map<?, ?>) statusObj;
                if (statusMap.containsKey("id")) {
                    Integer statusId = Integer.parseInt(statusMap.get("id").toString());
                    OrderStatus status = orderStatusRepo.findById(statusId)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái"));
                    existing.setStatus(status);
                }
            }
        }

        // shippingAddress
        if (body.containsKey("shippingAddress")) {
            Object addrObj = body.get("shippingAddress");
            if (addrObj instanceof Map) {
                Map<?, ?> addrMap = (Map<?, ?>) addrObj;
                Address addr = existing.getShippingAddress();
                if (addr == null) {
                    addr = new Address();
                    addr.setUser(existing.getUser());
                    existing.setShippingAddress(addr);
                }
                if (addrMap.containsKey("fullName")) {
                    addr.setFullName((String) addrMap.get("fullName"));
                }
                if (addrMap.containsKey("phoneNumber")) {
                    addr.setPhoneNumber((String) addrMap.get("phoneNumber"));
                }
                if (addrMap.containsKey("detailAdrs")) {
                    addr.setDetailAdrs((String) addrMap.get("detailAdrs"));
                }
                if (addrMap.containsKey("provinceCity")) {
                    addr.setProvinceCity((String) addrMap.get("provinceCity"));
                }
                if (addrMap.containsKey("countyDistrict")) {
                    addr.setCountyDistrict((String) addrMap.get("countyDistrict"));
                }
                if (addrMap.containsKey("wardCommune")) {
                    addr.setWardCommune((String) addrMap.get("wardCommune"));
                }
                addressRepo.save(addr);
            }
        }

        systemLogService.saveLog(
            "DELETE_ORDER",
            "INFO",
            "ADMIN cập nhật đơn hàng có id = " + existing.getId() + ", username = " + existing.getUser(),
            null,
            "ADMIN"
        );
        log.info("Đơn {} đã được cập nhật", id);
        return orderRepo.save(existing);
    }

    @Override
    @Transactional
    public void deleteOrder(Integer id) {
        log.warn("Admin xóa đơn {}",id);
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        Address address = order.getShippingAddress();
        orderRepo.delete(order);
        notificationService.createForUser(
            order.getUser().getId(),
            NotificationType.ORDER,
            "Đơn hàng đã bị xóa",
            "Đơn hàng " + order.getOrderCode() + " đã bị admin xóa",
            "/user/orders"
        );
        if (address != null) {
            log.info("Đã xóa đơn {}",id);
            systemLogService.saveLog(
                "DELETE_ORDER",
                "WARN",
                "ADMIN xóa đơn hàng có id = " + order.getId() + ", username = " + order.getUser(),
                null,
                "ADMIN"
            );
            addressRepo.delete(address);
        }
    }
    //xóa cart khi xong đơn hàng
    @Override
    @Transactional
    public void clearCartAfterPaymentSuccess(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        Integer userId = order.getUser().getId();
        List<Cart> cartItems = cartRepo.findByUserId(userId);

        cartRepo.deleteAll(cartItems);
    }
    // xl khi đơn hàng fail
    @Override
    @Transactional
    public Order updatePaymentFailed(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        OrderStatus cancelledStatus = orderStatusRepo.findById(6)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái hủy"));

        order.setStatus(cancelledStatus);
        notificationService.createForUser(
        order.getUser().getId(),
            NotificationType.ORDER,
            "Thanh toán thất bại",
            "Đơn hàng " + order.getOrderCode() + " đã bị hủy do thanh toán thất bại",
            "/user/orders/" + order.getId()
        );
        return orderRepo.save(order);
    }
}