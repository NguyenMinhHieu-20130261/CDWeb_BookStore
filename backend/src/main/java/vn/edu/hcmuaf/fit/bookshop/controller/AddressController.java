package vn.edu.hcmuaf.fit.bookshop.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;
import vn.edu.hcmuaf.fit.bookshop.service.imp.UserServiceImpl;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserServiceImpl userService;

   @GetMapping("/address")
    public ResponseEntity<?> getUserAddresses(
        // Lấy thông tin người dùng đã đăng nhập từ SecurityContext
        @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> user = userService.getUserByUsername(userDetails.getUsername());

        if(user.isPresent()) {
            return ResponseEntity.ok(addressService.getUserAddresses(user.get().getId())
            );
        }
        return ResponseEntity.notFound().build();
    }
}