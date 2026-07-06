package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;
import vn.edu.hcmuaf.fit.bookshop.entity.FavoriteProduct;

public interface FavoriteProductService {
    List<FavoriteProduct> getFavoritesByUserId(Integer userId);
    boolean toggleFavorite(Integer userId, Integer productId);
}
