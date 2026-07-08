package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Supplier;
import vn.edu.hcmuaf.fit.bookshop.repository.SupplierRepo;

import java.util.Map;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierRepo supplierRepo;

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        Sort.Direction direction = order.equalsIgnoreCase("DESC")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Page<Supplier> result = supplierRepo.findAll(
                PageRequest.of(page, perPage, Sort.by(direction, sort))
        );

        return ResponseEntity.ok(Map.of(
                "data", result.getContent(),
                "total", result.getTotalElements()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Integer id) {
        Supplier supplier = supplierRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà cung cấp"));

        return ResponseEntity.ok(Map.of("data", supplier));
    }
}