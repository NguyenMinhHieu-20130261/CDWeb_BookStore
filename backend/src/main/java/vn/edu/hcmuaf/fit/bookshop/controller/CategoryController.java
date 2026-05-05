package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Map<String, Object>> getAllCategoriesUser() {
        return categoryService.getAllCategories()
            .stream()
            .map(c -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", c.getId());
                map.put("name", c.getName());
                return map;
            })
            .toList();
    }

    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategories(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int perPage,
                                                           @RequestParam(defaultValue = "id") String sort,
                                                           @RequestParam(defaultValue = "{}") String filter,
                                                           @RequestParam(defaultValue = "ASC") String order) {
        Page<Category> categories = categoryService.getAllCategories(page, perPage, sort, filter, order);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/main-categories")
    public List<Category> getMainCategories() {
        return categoryService.getMainCategories();
    }

    @GetMapping("/{id}/subcategories")
    public List<Category> getSubCategories(@PathVariable Integer id) {
        return categoryService.getSubCategories(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer id) {
        Optional<Category> categoryOptional = categoryService.getCategoryById(id);
        return categoryOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}