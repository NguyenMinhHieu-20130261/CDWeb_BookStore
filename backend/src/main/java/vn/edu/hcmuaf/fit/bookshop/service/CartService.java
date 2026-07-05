package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.fit.bookshop.entity.Cart;

public interface CartService {
    ResponseEntity<?> addToCart(Cart cartItem);
    void removeFromCart(Integer cartItemId, Integer userId);
    ResponseEntity<?> updateQuantity( Integer cartItemId,  Integer quantity,  Integer userId);
    List<Cart> getCartItems();
    List<Cart> getCartItemsByUserId(Integer userId);
}
