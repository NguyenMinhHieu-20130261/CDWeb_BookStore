package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
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
    @GetMapping
    public List<Product> getProducts() {
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
    //
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Integer id,
            @RequestBody Product product
    ) {
        Product updated = productService.updateProduct(id, product);
        return ResponseEntity.ok(updated);
    }
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product,
            Authentication authentication
    ) {
        User admin = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
                productService.createProduct(product, admin)
        );
    }
}