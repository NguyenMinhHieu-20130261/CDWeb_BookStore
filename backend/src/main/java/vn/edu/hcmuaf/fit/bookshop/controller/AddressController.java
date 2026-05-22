package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.service.AddressService;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserAddresses(
        @PathVariable Integer userId) {
        return ResponseEntity.ok(
                addressService.getUserAddresses(userId)
        );
    }
    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody Address address) {
        Address saved = addressService.saveAddress(address);
        return ResponseEntity.ok(saved);
    }
    @GetMapping("/update/{id}")
    public ResponseEntity<?> getAddressById(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(
                addressService.getAddressById(id)
        );
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAddress(
        @PathVariable Integer id,
        @RequestBody Address address
    ) {
        return ResponseEntity.ok(
                addressService.updateAddress(id, address)
        );
    }
}
