package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();

    Page<Category> getAllCategories(int page, int perPage, String sort, String filter, String order);

    Optional<Category> getCategoryById(Integer id);

    List<Category> getMainCategories();

    List<Category> getSubCategories(Integer parentId);

}