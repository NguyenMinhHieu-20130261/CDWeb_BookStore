package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.repository.OrderStatusRepo;

import java.util.Map;

@RestController
@RequestMapping("/api/order-status")
public class OrderStatusController {

    @Autowired
    private OrderStatusRepo orderStatusRepo;

    @GetMapping
    public ResponseEntity<?> getAll() {
        var data = orderStatusRepo.findAll();

        return ResponseEntity.ok(Map.of(
                "data", data,
                "total", data.size()
        ));
    }
}