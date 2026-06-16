package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepo blogRepo;

    @Override
    public List<Blog> getActiveBlogs() {
        return blogRepo.findByStatusOrderByCreatedAtDesc(1);
    }

    @Override
    public List<Blog> getActiveBlogsByCategory(Integer categoryId) {
        return blogRepo.findByCategoryIdAndStatusOrderByCreatedAtDesc(categoryId, 1);
    }
    @Override
    public Blog getBlogDetail(String slug) {
        return blogRepo.findBySlugAndStatus(slug, 1)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết"));
    }
    @Override
    public Page<Blog> getBlogs(int page, int perPage, String sort, String filter, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        String keyword = extractKeyword(filter);

        if (keyword.isBlank()) {
            return blogRepo.findAll(pageable);
        }

        return blogRepo.findAll((root, query, cb) ->
                cb.or(
                        cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("slug")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("shortDescription")), "%" + keyword.toLowerCase() + "%")
                ),
                pageable
        );
    }
    private String extractKeyword(String filter) {
        if (filter == null || filter.isBlank() || filter.equals("{}")) {
            return "";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(filter);

            if (node.has("q")) {
                return node.get("q").asText().trim();
            }

            return "";
        } catch (Exception e) {
            return filter.trim();
        }
    }
}