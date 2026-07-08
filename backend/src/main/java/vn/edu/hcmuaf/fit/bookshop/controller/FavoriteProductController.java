package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.FavoriteProduct;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.FavoriteProductService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin("*")
public class FavoriteProductController {

    @Autowired
    private FavoriteProductService favoriteProductService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getWishlist(@PathVariable Integer userId) {
        try {
            List<FavoriteProduct> favorites =
                    favoriteProductService.getFavoritesByUserId(userId);

            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/toggle/{productId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable Integer productId, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            boolean favorited = favoriteProductService.toggleFavorite(user.getId(), productId);
            return ResponseEntity.ok(Map.of("favorited", favorited));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
