package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<Blog>> getBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) Integer perPage,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "") String filter,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        int pageSize = perPage != null ? perPage : (size != null ? size : 10);

        if ("{}".equals(filter)) {
            filter = "";
        }

        Page<Blog> blogs = blogService.getBlogs(page, pageSize, sort, filter, order);

        return ResponseEntity.ok(blogs);
    }
     @GetMapping("/{categoryId}")
    public ResponseEntity<List<Blog>> getBlogsByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(blogService.getActiveBlogsByCategory(categoryId));
    }
    @GetMapping("/detail/{slug}")
    public ResponseEntity<Blog> getBlogDetail(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBlogDetail(slug));
    }
}
