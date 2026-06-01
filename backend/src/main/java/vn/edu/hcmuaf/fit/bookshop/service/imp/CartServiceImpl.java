package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Cart;
import vn.edu.hcmuaf.fit.bookshop.repository.CartRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CartService;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepo cartRepo;

    @Override
    public ResponseEntity<?> addToCart(Cart cartItem) {
        if (cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
            return ResponseEntity.badRequest().body("Yêu cầu sản phẩm");
        }

        if (cartItem.getUser() == null || cartItem.getUser().getId() == null) {
            return ResponseEntity.badRequest().body("Yêu cầu nhân vật");
        }

        if (cartItem.getQuantity() <= 0) {
            cartItem.setQuantity(1);
        }

        Integer userId = cartItem.getUser().getId();
        Integer productId = cartItem.getProduct().getId();

        Optional<Cart> existingCartItem =
                cartRepo.findByUserIdAndProductId(userId, productId);

        if (existingCartItem.isPresent()) {
            Cart existing = existingCartItem.get();
            existing.setQuantity(existing.getQuantity() + cartItem.getQuantity());
            cartRepo.save(existing);

            return ResponseEntity.ok(existing);
        }

        Cart savedCartItem = cartRepo.save(cartItem);
        return ResponseEntity.ok(savedCartItem);
    }

    @Override
    public void removeFromCart(int cartItemId) {
        cartRepo.deleteById(cartItemId);
    }

    @Override
    public List<Cart> getCartItems() {
        return cartRepo.findAll();
    }

    @Override
    public List<Cart> getCartItemsByUserId(Integer userId) {
        return cartRepo.findByUserId(userId);
    }
}
