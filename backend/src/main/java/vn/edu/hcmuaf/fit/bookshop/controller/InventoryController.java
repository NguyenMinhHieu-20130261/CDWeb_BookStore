package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.dto.InventoryCreateRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;
import vn.edu.hcmuaf.fit.bookshop.service.InventoryService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(inventoryService.getById(id));
    }
    @GetMapping
    public ResponseEntity<?> getAllInventories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") String order,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Boolean active
    ) {
        Sort.Direction direction = order.equalsIgnoreCase("ASC")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        Page<Inventory> inventories = inventoryService.getAll(q, active, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("data", inventories.getContent());
        response.put("total", inventories.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createInventory(@RequestBody InventoryCreateRequest request) {
        return ResponseEntity.ok(inventoryService.createInventory(request));
    }
}