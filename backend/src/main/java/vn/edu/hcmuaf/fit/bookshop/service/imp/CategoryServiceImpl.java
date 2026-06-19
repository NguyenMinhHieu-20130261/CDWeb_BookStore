package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.repository.CategoryRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
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
                return cb.and(predicates.toArray(new Predicate[0]));
            } catch (Exception e) {
                return cb.conjunction();
            }
        }, pageable);
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