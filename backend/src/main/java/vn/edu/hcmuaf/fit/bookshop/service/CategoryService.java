package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Integer id);
    List<Category> getMainCategories();
    List<Category> getSubCategories(Integer parentId);
    //admin
    Page<Category> getAllCategories(int page, int perPage, String sort, String filter, String order);
    Category updateCategory(Integer id, Category category);
    Category createCategory(Category category, User admin);
    Category deleteCategory(Integer id, User admin);
}