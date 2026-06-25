package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.repository.*;
import org.springframework.data.domain.*;
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
    //admin
        @Override
    public Page<Order> getAllOrders(int page, int perPage, String sort, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));
        return orderRepo.findAll(pageable);
    }

    @Override
    public Order getOrderById(Integer id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
    }
    
    @Override
    public Order updateOrderStatus(Integer id, Integer statusId) {
        Order existing = getOrderById(id);
        OrderStatus status = orderStatusRepo.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái"));
        existing.setStatus(status);
        return orderRepo.save(existing);
    }
}