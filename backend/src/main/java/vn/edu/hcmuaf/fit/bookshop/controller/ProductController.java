package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;
    @GetMapping("/active")
    public List<Product> getActiveProducts() {
        return productService.getActiveProducts();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
    @GetMapping("/detail/{slug}")
    public Product getProductDetail(@PathVariable String slug) {
        return productService.findBySlugAndActiveTrue(slug);
    }
    @GetMapping("/main-category/{categoryId}")
    public List<Product> getProductsByCategoryTree(@PathVariable Integer categoryId) {
        return productService.getProductsByCategoryTree(categoryId);
    }
    @GetMapping("/latest/{categoryId}")
    public List<Product> getThreeLatestProductByCategoryTree(@PathVariable Integer categoryId) {
        return productService.getThreeLatestProductByCategoryTree(categoryId);
    }
    @GetMapping("/top-rated")
    public Product getTopRatedProduct() {
        return productService.getTopRatedProduct();
    }
    @GetMapping("/most-reviewed")
    public List<Product> getTop2MostReviewedProducts() {
        return productService.getTop2MostReviewedProducts();
    }
    @GetMapping("/best-selling")
    public ResponseEntity<Page<Product>> getBestSellingProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                productService.getBestSellingProducts(page, size)
        );
    }
    //
    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) Integer perPage,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "") String filter,
            @RequestParam(defaultValue = "ASC") String order
    ) {
        int pageSize = perPage != null ? perPage : (size != null ? size : 10);
        if ("{}".equals(filter)) {
            filter = "";
        }
        Page<Product> products = productService.getProducts(page, pageSize, sort, filter, order);
        return ResponseEntity.ok(products);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Integer id,
            @RequestBody Product product
    ) {
        Product updated = productService.updateProduct(id, product);
        return ResponseEntity.ok(updated);
    }
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product,
            Authentication authentication
    ) {
        User admin = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
                productService.createProduct(product, admin)
        );
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> deleteProduct(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User admin = (User) authentication.getPrincipal();
        Product deleted = productService.deleteProduct(id, admin);
        return ResponseEntity.ok(deleted);
    }
}