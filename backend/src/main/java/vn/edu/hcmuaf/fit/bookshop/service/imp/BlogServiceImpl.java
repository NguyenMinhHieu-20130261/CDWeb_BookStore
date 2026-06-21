package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;

import java.util.Date;
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
    //admin
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
    @Override
    public Blog getBlogById(Integer id) {
        return blogRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết"));
    }
    @Override
    public Blog updateBlog(Integer id, Blog blog) {
        Blog existingBlog = blogRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết"));

        existingBlog.setTitle(blog.getTitle());
        existingBlog.setThumbnail(blog.getThumbnail());
        existingBlog.setSlug(blog.getSlug());
        existingBlog.setShortDescription(blog.getShortDescription());
        existingBlog.setContent(blog.getContent());
        existingBlog.setStatus(blog.getStatus());
        existingBlog.setUpdatedAt(new Date());

        if (blog.getCategory() != null && blog.getCategory().getId() != 0) {
            BlogCategory category = new BlogCategory();
            category.setId(blog.getCategory().getId());
            existingBlog.setCategory(category);
        } else {
            existingBlog.setCategory(null);
        }

        return blogRepo.save(existingBlog);
    }
    @Override
    public Blog createBlog(Blog blog, User admin) {
        blog.setCreatedBy(admin);
        blog.setUpdatedBy(admin);
        blog.setCreatedAt(new Date());
        blog.setUpdatedAt(new Date());

        if (blog.getStatus() == null) {
            blog.setStatus(1);
        }
        
        if (blog.getViewCount() == null) {
            blog.setViewCount(0);
        }

        if (blog.getCategory() != null && blog.getCategory().getId() != 0) {
            BlogCategory category = new BlogCategory();
            category.setId(blog.getCategory().getId());
            blog.setCategory(category);
        } else {
            blog.setCategory(null);
        }

        return blogRepo.save(blog);
    }
    @Override
    public Blog deleteBlog(Integer id, User admin) {
        Blog blog = blogRepo.findById(id)
                    .orElseThrow(() ->new RuntimeException("Không tìm thấy bai viet"));
            blog.setStatus(0);
            blog.setUpdatedBy(admin);
            blog.setUpdatedAt(new Date());

            return blogRepo.save(blog);
    }
}