package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.repository.CategoryRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public Page<Category> getAllCategories(int page, int perPage, String sort, String filter, String order) {

        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        // nếu có filter theo name
        if (filter != null && !filter.isEmpty()) {
            return categoryRepo.findAll((root, query, cb) ->
                    cb.like(root.get("name"), "%" + filter + "%"), pageable);
        }

        return categoryRepo.findAll(pageable);
    }

    @Override
    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepo.findById(id);
    }

    @Override
    public List<Category> getMainCategories() {
        return categoryRepo.findByParentCategoryIsNull();
    }

    @Override
    public List<Category> getSubCategories(Integer parentId) {
        return categoryRepo.findByParentCategory_Id(parentId);
    }
}