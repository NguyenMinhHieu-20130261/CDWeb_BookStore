package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
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
}