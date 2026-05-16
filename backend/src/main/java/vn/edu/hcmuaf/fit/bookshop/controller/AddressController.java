package vn.edu.hcmuaf.fit.bookshop.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;

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
}