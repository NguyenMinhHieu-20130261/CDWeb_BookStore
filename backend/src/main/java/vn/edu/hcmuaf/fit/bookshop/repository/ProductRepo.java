package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findByActiveTrue();
    List<Product> findByCategoryIdAndActiveTrue(Integer categoryId);
}