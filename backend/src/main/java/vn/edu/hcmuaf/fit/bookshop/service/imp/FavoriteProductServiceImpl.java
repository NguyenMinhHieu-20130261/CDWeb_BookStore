package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.FavoriteProduct;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.FavoriteProductRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductImageRepo;
import vn.edu.hcmuaf.fit.bookshop.service.FavoriteProductService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class FavoriteProductServiceImpl implements FavoriteProductService {

    @Autowired
    private FavoriteProductRepo favoriteProductRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductImageRepo productImageRepo;

    @Override
    public List<FavoriteProduct> getFavoritesByUserId(Integer userId) {
        log.info("Fetching favorites for user id {}", userId);
        List<FavoriteProduct> favorites = favoriteProductRepo.findByUserId(userId);
        for (FavoriteProduct favorite : favorites) {
            if (favorite.getProduct() != null) {
                Integer productId = favorite.getProduct().getId();
                favorite.getProduct().setImages(productImageRepo.findByProduct_Id(productId));
            }
        }
        return favorites;
    }

    @Override
    public boolean toggleFavorite(Integer userId, Integer productId) {
        log.info("Toggling favorite status: user id {}, product id {}", userId, productId);
        Optional<FavoriteProduct> existing = favoriteProductRepo.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            favoriteProductRepo.delete(existing.get());
            log.info("Removed product id {} from user id {}'s wishlist", productId, userId);
            return false;
        } else {
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + productId));
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với id: " + userId));

            FavoriteProduct fav = new FavoriteProduct();
            fav.setProduct(product);
            fav.setUser(user);
            favoriteProductRepo.save(fav);
            log.info("Added product id {} to user id {}'s wishlist", productId, userId);
            return true;
        }
    }
}
