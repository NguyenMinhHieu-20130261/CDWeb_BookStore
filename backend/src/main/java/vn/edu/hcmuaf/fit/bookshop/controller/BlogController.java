package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    
    @Autowired
    private  BlogService blogService;

    @GetMapping
    public ResponseEntity<List<Blog>> getBlogs() {
        return ResponseEntity.ok(blogService.getActiveBlogs());
    }
     @GetMapping("/{categoryId}")
    public ResponseEntity<List<Blog>> getBlogsByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(blogService.getActiveBlogsByCategory(categoryId));
    }
}
