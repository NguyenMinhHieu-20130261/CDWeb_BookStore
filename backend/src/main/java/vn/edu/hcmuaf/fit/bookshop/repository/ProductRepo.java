package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findByActiveTrue();
    List<Product> findByCategoryIdAndActiveTrue(Integer categoryId);
    List<Product> findByCategoryIdInAndActiveTrue(List<Integer> categoryIds);
    List<Product> findByTitleContainingIgnoreCaseAndActiveTrue(String keyword);
    List<Product> findTop3ByCategoryIdInAndActiveTrueOrderByIdDesc(List<Integer> categoryIds);
    Optional<Product> findBySlugAndActiveTrue(String slug);
    //active + stock
    @Query("""
        SELECT p
        FROM Product p
        JOIN p.detail d
        WHERE p.active = true
        AND d.quantity IS NOT NULL
        AND d.quantity > 0
    """)
    List<Product> findActiveProductsInStock();
    //rated
    @Query(value = "SELECT p.* FROM products p LEFT JOIN review r ON p.id = r.product_id WHERE p.active = true GROUP BY p.id ORDER BY COALESCE(AVG(r.rating), 0) DESC, COUNT(r.id) DESC LIMIT 1", nativeQuery = true)
    Optional<Product> findTopRatedProduct();
    //review
    @Query(value = "SELECT p.* FROM products p LEFT JOIN review r ON p.id = r.product_id WHERE p.active = true GROUP BY p.id ORDER BY COUNT(r.id) DESC, p.id DESC LIMIT 2", nativeQuery = true)
    List<Product> findTop2MostReviewedProducts();
    //BEST SELLING
    @Query("""
        SELECT p
        FROM Product p
        LEFT JOIN OrderDetail od ON od.product = p
        LEFT JOIN od.order o
        LEFT JOIN o.status s
        WHERE s.slug = 'delivered'
        GROUP BY p
        ORDER BY COALESCE(SUM(od.quantity), 0) DESC
    """)
    Page<Product> findBestSellingProducts(Pageable pageable);
    //Admin
    Page<Product> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Product> findByActive(Boolean active, Pageable pageable);
    Page<Product> findByTitleContainingIgnoreCaseAndActive(String title, Boolean active, Pageable pageable);

}