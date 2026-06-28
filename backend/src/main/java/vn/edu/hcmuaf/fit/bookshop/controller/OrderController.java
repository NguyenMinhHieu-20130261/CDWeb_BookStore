package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.dto.request.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.service.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public List<Order> getOrdersByUser_Id(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return orderService.getOrdersByUser_Id(userId, sort);
    }
    @GetMapping("/detail/{orderId}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Integer orderId) {
        try {
            return ResponseEntity.ok(orderService.getOrderDetail(orderId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Order savedOrder = orderService.createOrder(orderRequest);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Integer orderId) {
        try {
            Order cancelledOrder = orderService.cancelOrder(orderId);
            return ResponseEntity.ok(cancelledOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<Page<Order>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "{}") String filter,
            @RequestParam(defaultValue = "ASC") String order
    ) {
        Page<Order> orders = orderService.getAllOrders(page, perPage, sort, filter, order);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        try {
            Order order = orderService.getOrderDetail(id);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Integer id, @RequestBody Order updatedOrder) {
        try {
            if (updatedOrder.getShippingAddress() == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Địa chỉ giao hàng không được để trống"));
            }
            if (updatedOrder.getShippingAddress().getFullName() == null || updatedOrder.getShippingAddress().getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Tên người mua không được để trống"));
            }
            if (updatedOrder.getPaymentMethod() == null || updatedOrder.getPaymentMethod().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Phương thức thanh toán không được để trống"));
            }
            if (updatedOrder.getStatus() == null || updatedOrder.getStatus().getId() == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Trạng thái đơn hàng không được để trống"));
            }

            Order saved = orderService.updateOrder(id, updatedOrder);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}

