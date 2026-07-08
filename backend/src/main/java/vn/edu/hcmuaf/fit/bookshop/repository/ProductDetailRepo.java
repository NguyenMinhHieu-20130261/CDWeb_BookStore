package vn.edu.hcmuaf.fit.bookshop.repository;

import vn.edu.hcmuaf.fit.bookshop.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailRepo extends JpaRepository<ProductDetail, Integer> {
}