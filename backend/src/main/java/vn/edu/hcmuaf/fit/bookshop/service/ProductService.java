package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getActiveProducts();
    List<Product> getProductsByCategory(Integer categoryId);
    Product getProductById(Integer id);
}
