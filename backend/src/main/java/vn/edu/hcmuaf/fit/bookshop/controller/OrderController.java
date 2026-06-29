package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderReplyRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.order.OrderRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.*;
import vn.edu.hcmuaf.fit.bookshop.service.*;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/user")
    public List<Order> getOrdersByUser_Id(
            Authentication authentication,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        User user = (User) authentication.getPrincipal();
        return orderService.getOrdersByUser_Id(user.getId(), sort);
    }
    @GetMapping("/detail/{orderId}")
    public ResponseEntity<?> getOrderDetail(
            @PathVariable Integer orderId,
            Authentication authentication
        ) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(
                    orderService.getOrderDetailForUser(orderId, user.getId())
            );        
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest orderRequest,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            orderRequest.setUserId(user.getId());

            Order savedOrder = orderService.createOrder(orderRequest);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Integer orderId,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();

            Order cancelledOrder = orderService.cancelOrderForUser(orderId,user.getId());
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
            @RequestParam(defaultValue = "{}") String filter,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        Page<Order> result = orderService.getAllOrders(page, perPage, sort, filter, order);

        return ResponseEntity.ok(Map.of(
                "data", result.getContent(),
                "total", result.getTotalElements()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer id) {
        try {
            Order order = orderService.getOrderById(id);
            return ResponseEntity.ok(
                    Map.of("data", order)
            );
        } catch (Exception e) {
            return ResponseEntity.notFound()
                    .build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> body
    ) {
        try {
            Order updated = orderService.updateOrder(id, body);
            return ResponseEntity.ok(Map.of("data", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok(Map.of("data", Map.of("id", id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}