package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
// import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.CategoryRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.Date;
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
    //admin
    @Override
    public Page<Category> getAllCategories(int page, int perPage, String sort, String filter, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));
        if (filter == null || filter.isEmpty() || filter.equals("{}")) {
            return categoryRepo.findAll(pageable);
        }
        return categoryRepo.findAll((root, query, cb) -> {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree(filter);
                List<Predicate> predicates = new ArrayList<>();
                if (json.has("parentCategory")) {
                    JsonNode parent = json.get("parentCategory");
                    if (parent.isNull()) {
                        predicates.add(cb.isNull(root.get("parentCategory")));
                    } else {
                        predicates.add(cb.equal(
                                root.get("parentCategory").get("id"),
                                parent.asInt()
                        ));
                    }
                }
                if (json.has("active")) {
                    predicates.add(cb.equal(
                            root.get("active"),
                            json.get("active").asBoolean()
                    ));
                }
                if (json.has("q") && !json.get("q").asText().isBlank()) {
                    String q = json.get("q").asText().toLowerCase();
                    predicates.add(
                            cb.like(
                                    cb.lower(root.get("name")),
                                    "%" + q + "%"
                            )
                    );
                }
                return cb.and(predicates.toArray(new Predicate[0]));
            } catch (Exception e) {
                return cb.conjunction();
            }
        }, pageable);
    }

    @Override
    public Category updateCategory(Integer id, Category category) {
        Category existingCate = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        existingCate.setName(category.getName());
        existingCate.setActive(category.isActive());
        if (category.getParentCategory() != null 
                && category.getParentCategory().getId() != null) {
            existingCate.setParentCategory(category.getParentCategory());
        } else {
            existingCate.setParentCategory(null);
        }
        existingCate.setUpdatedAt(new Date());
        return categoryRepo.save(existingCate);
    }

    @Override
    public Category createCategory(Category category, User admin) {

        category.setCreatedBy(admin);
        category.setUpdatedBy(admin);
        category.setCreatedAt(new Date());
        category.setUpdatedAt(new Date());
        category.setActive(true);

        if(category.getParentCategory() != null
                && category.getParentCategory().getId() != null){
            Category parent = categoryRepo.findById(
                    category.getParentCategory().getId()
            ).orElseThrow(
                    () -> new RuntimeException("Không tìm thấy danh mục cha")
            );
            category.setParentCategory(parent);
        } else {
            category.setParentCategory(null);
        }
        return categoryRepo.save(category);
    }

    @Override
    public Category deleteCategory(Integer id, User admin) {
        Category category = categoryRepo.findById(id)
                    .orElseThrow(() ->new RuntimeException("Không tìm thấy danh mục"));
            category.setActive(false);
            category.setUpdatedBy(admin);
            category.setUpdatedAt(new Date());

            return categoryRepo.save(category);
    }
    
}