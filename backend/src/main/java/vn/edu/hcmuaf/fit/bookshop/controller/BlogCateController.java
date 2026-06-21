package vn.edu.hcmuaf.fit.bookshop.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.service.BlogCateService;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogCateRepo;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/blog-cate")
public class BlogCateController {

    @Autowired
    private BlogCateService blogCateService;

    @Autowired
    private BlogCateRepo blogCateRepo;

    @GetMapping("/all")
    public List<Map<String, Object>> getAllBlogCateUser() {
        return blogCateService.getAllBlogCate()
                .stream()
                .map(c -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", c.getId());
                    map.put("name", c.getName());
                    return map;
                })
                .toList();
    }
    //admin
    @GetMapping
    public ResponseEntity<?> getBlogCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        Sort.Direction direction = order.equalsIgnoreCase("DESC")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));
        Page<BlogCategory> result = blogCateRepo.findAll(pageable);

        return ResponseEntity.ok(result);
    }
    @GetMapping("/{id}")
    public ResponseEntity<BlogCategory> getBlogCategoryById(@PathVariable Integer id) {
        return blogCateService.getBlogCateById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}