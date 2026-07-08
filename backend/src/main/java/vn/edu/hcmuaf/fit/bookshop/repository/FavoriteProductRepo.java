package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.FavoriteProduct;
import java.util.List;
import java.util.Optional;

public interface FavoriteProductRepo extends JpaRepository<FavoriteProduct, Integer> {
    List<FavoriteProduct> findByUserId(Integer userId);
    Optional<FavoriteProduct> findByUserIdAndProductId(Integer userId, Integer productId);
    boolean existsByUserIdAndProductId(Integer userId, Integer productId);
}
