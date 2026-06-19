package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getActiveProducts();
    List<Product> getProductsByCategory(Integer categoryId);
    List<Product> getProductsByCategoryTree(Integer categoryId);
    Product getProductById(Integer id);
    Product findBySlugAndActiveTrue(String slug);
    List<Product> getThreeLatestProductByCategoryTree(Integer categoryId);
    Product getTopRatedProduct();
    List<Product> getTop2MostReviewedProducts();
}
