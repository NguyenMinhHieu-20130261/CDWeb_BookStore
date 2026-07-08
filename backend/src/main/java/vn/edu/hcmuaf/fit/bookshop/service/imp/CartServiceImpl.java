package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Cart;
import vn.edu.hcmuaf.fit.bookshop.repository.CartRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductImageRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CartService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductImageRepo productImageRepo;
    
    @Autowired
    private SystemLogService systemLogService;

    @Override
    public ResponseEntity<?> addToCart(Cart cartItem) {
        log.info("Yêu cầu thêm sản phẩm vào giỏ hàng");
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
        log.info(
            "User {} thêm product {} vào giỏ, quantity={}",
            userId,
            productId,
            cartItem.getQuantity()
        );        
        Optional<Cart> existingCartItem =
                cartRepo.findByUserIdAndProductId(userId, productId);

        if (existingCartItem.isPresent()) {
            Cart existing = existingCartItem.get();
            existing.setQuantity(existing.getQuantity() + cartItem.getQuantity());
            cartRepo.save(existing);
            log.info(
                "Cập nhật số lượng giỏ hàng: userId={}, productId={}, newQuantity={}",
                userId,
                productId,
                existing.getQuantity()
            );
            return ResponseEntity.ok(existing);
        }
        Cart savedCartItem = cartRepo.save(cartItem);

        log.info(
            "Thêm mới cart item thành công: cartId={}, userId={}, productId={}",
            savedCartItem.getId(),
            userId,
            productId
        );
        return ResponseEntity.ok(savedCartItem);
    }

    @Override
    public void removeFromCart(Integer cartItemId, Integer userId) {
        log.warn("User {} xóa cartItem {}", userId, cartItemId);
        Cart cart = cartRepo.findById(cartItemId).orElseThrow();

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền thao tác giỏ hàng này");
        }
        log.info("Đã xóa cartItem {}", cartItemId);
        cartRepo.deleteById(cartItemId);
    }

    @Override
    public List<Cart> getCartItems() {
        return cartRepo.findAll();
    }

    @Override
    public List<Cart> getCartItemsByUserId(Integer userId) {
        List<Cart> carts = cartRepo.findByUserId(userId);
        for (Cart cart : carts) {
            Integer productId = cart.getProduct().getId();
            cart.getProduct().setImages(
                productImageRepo.findByProduct_Id(productId)
            );
            
            var images = productImageRepo.findByProduct_Id(productId);
            log.debug(
                "Product {} có {} ảnh trong giỏ hàng user {}",
                productId,
                images.size(),
                userId
            );
        }
        return carts;    
    }
    @Override
    public ResponseEntity<?> updateQuantity(Integer cartItemId, Integer quantity, Integer userId) {
        log.info(
            "User {} cập nhật cartItem {} quantity={}",
            userId,
            cartItemId,
            quantity
        );
        Cart cart = cartRepo.findById(cartItemId).orElseThrow();
        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền thao tác giỏ hàng này");
        }
        cart.setQuantity(quantity);
        Cart saved = cartRepo.save(cart);

        log.info(
            "Cập nhật số lượng cartItem {} thành công, quantity={}",
            cartItemId,
            saved.getQuantity()
        );
        return ResponseEntity.ok(saved);
    }
}
