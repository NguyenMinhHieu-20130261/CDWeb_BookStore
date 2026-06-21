package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.service.AddressService;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserAddresses(@PathVariable Integer userId,Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();

        if (!currentUser.getId().equals(userId)) {
            return ResponseEntity.status(403).body("Bạn không có quyền xem địa chỉ của user khác");
        }
        return ResponseEntity.ok(
                addressService.getUserAddresses(userId)
        );
    }
    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody Address address, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        address.setUser(currentUser);
        Address saved = addressService.saveAddress(address);
        return ResponseEntity.ok(saved);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Integer id, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        addressService.deleteAddress(id,currentUser.getId());
        return ResponseEntity.ok("xóa địa chỉ thành công");
    }
    @GetMapping("/update/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable Integer id){
        return ResponseEntity.ok(
                addressService.getAddressById(id)
        );
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer id,@RequestBody Address address,Authentication authentication){
        User currentUser = (User) authentication.getPrincipal();
        address.setUser(currentUser);
        return ResponseEntity.ok(
                addressService.updateAddress(id, address)
        );
    }
    @PutMapping("/default/{addressId}")
    public ResponseEntity<?> setDefaultAddress(@PathVariable Integer addressId) {
        addressService.setDefaultAddress(addressId);
        return ResponseEntity.ok("Set default address successfully");
    }
    //admin
    @GetMapping
    public ResponseEntity<?> getAllAddresses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        return ResponseEntity.ok(
                addressService.getAllAddresses(page, perPage)
        );
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getAddressDetail(@PathVariable Integer id) {
        return ResponseEntity.ok(
                addressService.getAddressById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> adminDeleteAddress(@PathVariable Integer id) {
        addressService.adminDeleteAddress(id);
        return ResponseEntity.ok("Xóa địa chỉ thành công");
    }
}