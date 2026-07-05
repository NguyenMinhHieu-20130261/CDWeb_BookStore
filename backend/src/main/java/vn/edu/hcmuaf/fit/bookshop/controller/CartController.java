package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Cart;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.CartService;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<?> getCartItems(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();

            List<Cart> cartItems = cartService.getCartItemsByUserId(user.getId());

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestBody Cart cartItem,            
            Authentication authentication
        ) {
        try {
            User user = (User) authentication.getPrincipal();
            cartItem.setUser(user);
            return cartService.addToCart(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeFromCart(
            @PathVariable int cartItemId,
            Authentication authentication
        ) {
        try {
            User user = (User) authentication.getPrincipal();
            cartService.removeFromCart(cartItemId,user.getId());
            return ResponseEntity.ok("Removed from cart successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update-quantity/{cartItemId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable int cartItemId,
            @RequestBody Cart cartItem,
            Authentication authentication
        ) {
        try {
            User user = (User) authentication.getPrincipal();
            return cartService.updateQuantity(cartItemId, cartItem.getQuantity(),user.getId());        
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}