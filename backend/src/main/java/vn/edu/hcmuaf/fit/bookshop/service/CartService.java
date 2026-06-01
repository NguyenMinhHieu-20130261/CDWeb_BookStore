package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.fit.bookshop.entity.Cart;

public interface CartService {
    ResponseEntity<?> addToCart(Cart cartItem);
    void removeFromCart(int cartItemId);
    List<Cart> getCartItems();
    List<Cart> getCartItemsByUserId(Integer userId);
}
