package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Cart;
import vn.edu.hcmuaf.fit.bookshop.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Cart cartItem) {
        try {
            return cartService.addToCart(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable int cartItemId) {
        try {
            cartService.removeFromCart(cartItemId);
            return ResponseEntity.ok("Removed from cart successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/items/{userId}")
    public ResponseEntity<?> getCartItemsByUserId(@PathVariable Integer userId) {
        try {
            List<Cart> cartItems = cartService.getCartItemsByUserId(userId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}