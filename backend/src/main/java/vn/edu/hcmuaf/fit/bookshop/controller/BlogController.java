package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    
    @Autowired
    private  BlogService blogService;

    @GetMapping("/active-page")
    public ResponseEntity<Page<Blog>> getActiveBlogsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) Integer categoryId
    ) {
        return ResponseEntity.ok(
                blogService.getActiveBlogsPage(page, size, categoryId)
        );
    }

    @GetMapping("/detail/{slug}")
    public ResponseEntity<Blog> getBlogDetail(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBlogDetail(slug));
    }
    // admin
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }
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
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable Integer id,
            @RequestBody Blog blog
    ) {
        Blog updated = blogService.updateBlog(id, blog);
        return ResponseEntity.ok(updated);
    }
    @PostMapping
    public ResponseEntity<Blog> createProduct(
            @RequestBody Blog blog,
            Authentication authentication
    ) {
        User admin = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
            blogService.createBlog(blog, admin)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> deleteCategory(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User admin = (User) authentication.getPrincipal();
        Blog deleted = blogService.deleteBlog(id, admin);
        return ResponseEntity.ok(deleted);
    }
}
