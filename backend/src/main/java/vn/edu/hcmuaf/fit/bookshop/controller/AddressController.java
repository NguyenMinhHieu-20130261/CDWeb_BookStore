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
        System.out.println("USER: " + address.getUser());
        System.out.println("USER ID: " + address.getUser().getId());
        Address saved = addressService.saveAddress(address);
        return ResponseEntity.ok(saved);
    }
}
