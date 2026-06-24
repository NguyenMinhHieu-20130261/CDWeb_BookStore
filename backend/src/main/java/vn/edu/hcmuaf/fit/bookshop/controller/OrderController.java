package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.dto.request.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.service.*;
import org.springframework.data.domain.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

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

    @GetMapping("/user/{userId}")
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
    //admin
        @GetMapping
    public ResponseEntity<?> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        Page<Order> result = orderService.getAllOrders(page, perPage, sort, order);

        return ResponseEntity.ok(Map.of(
                "data", result.getContent(),
                "total", result.getTotalElements()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(
                Map.of("data", order)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> body
    ) {
        Map<String, Object> status = (Map<String, Object>) body.get("status");
        Integer statusId = (Integer) status.get("id");

        Order updated = orderService.updateOrderStatus(id, statusId);

        return ResponseEntity.ok(Map.of("data", updated));
    }
}
