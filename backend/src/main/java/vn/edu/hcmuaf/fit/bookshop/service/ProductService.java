package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

import java.util.List;

public interface ProductService {
    List<Product> getActiveProducts();
    List<Product> getProductsByCategory(Integer categoryId);
    List<Product> getProductsByCategoryTree(Integer categoryId);
    Product findBySlugAndActiveTrue(String slug);
    List<Product> getThreeLatestProductByCategoryTree(Integer categoryId);
    Product getTopRatedProduct();
    List<Product> getTop2MostReviewedProducts();
    // admin
    Product getProductById(Integer id);
    Product updateProduct(Integer id, Product product);
    Product createProduct(Product product, User admin);
    Product deleteProduct(Integer id, User admin);
}
