package vn.edu.hcmuaf.fit.bookshop.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.service.BlogCateService;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/blog-cate")
public class BlogCateController {

    @Autowired
    private BlogCateService blogCateService;

    @GetMapping
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

    @GetMapping("/{id}")
    public ResponseEntity<BlogCategory> getBlogCategoryById(@PathVariable Integer id) {
        return blogCateService.getBlogCateById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}