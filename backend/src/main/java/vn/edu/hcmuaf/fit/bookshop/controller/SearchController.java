package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;

import java.util.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SearchController {
    private final ProductRepo productRepo;
    private final BlogRepo blogRepo;

    @GetMapping
    public List<Map<String, Object>> search(@RequestParam String keyword) {
        List<Map<String, Object>> results = new ArrayList<>();
        if (keyword == null || keyword.trim().length() < 2) {
            return results;
        }
        String q = keyword.trim();
        // lấy product
        List<Product> products = productRepo.findByTitleContainingIgnoreCaseAndActiveTrue(q);
        for (Product p : products) {
            Map<String, Object> item = new HashMap<>();
            item.put("type", "product");
            item.put("id", p.getId());
            item.put("slug", p.getSlug());
            item.put("title", p.getTitle());
            item.put("image", p.getImage());
            item.put("url", "/product-detail/" + p.getSlug());
            results.add(item);
        }
        // Lấy blog
        List<Blog> blogs = blogRepo.findByTitleContainingIgnoreCaseAndStatusOrderByCreatedAtDesc(q, 1);
        for (Blog b : blogs) {
            Map<String, Object> item = new HashMap<>();
            item.put("type", "blog");
            item.put("id", b.getId());
            item.put("title", b.getTitle());
            item.put("image", b.getThumbnail());
            item.put("slug", b.getSlug());
            item.put("url", "/blog-detail/" + b.getSlug());
            results.add(item);
        }
        return results;
    }
}