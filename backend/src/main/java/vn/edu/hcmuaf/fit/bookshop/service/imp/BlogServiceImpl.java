package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogCateRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;

import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepo blogRepo;
    
    @Autowired
    private SystemLogService systemLogService;

    @Autowired
    private BlogCateRepo blogCateRepo;

    @Override
    public Page<Blog> getActiveBlogsPage(int page, int size, Integer categoryId) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        if (categoryId == null) {
            return blogRepo.findByStatus(1, pageable);
        }

        return blogRepo.findByStatusAndCategoryId(1, categoryId, pageable);
    }
    
    @Override
    public Blog getBlogDetail(String slug) {
        log.debug("Lấy chi tiết bài viết slug={}", slug);

        return blogRepo.findBySlugAndStatus(slug, 1)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy bài viết slug={}", slug);
                return new RuntimeException("Không tìm thấy bài viết");
            });
    }

    //admin
    @Override
    public Page<Blog> getBlogs(int page, int perPage, String sort, String filter, String order) {
        log.debug("Admin lấy danh sách blog: page={}, perPage={}, sort={}, order={}, filter={}",
            page, perPage, sort, order, filter);
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
        log.debug("Lấy blog id={}", id);

        return blogRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy blog id={}", id);
                    return new RuntimeException("Không tìm thấy bài viết");
                });
    }

    @Override
    public Blog updateBlog(Integer id, Blog blog) {
        log.info("Admin cập nhật blog id={}", id);
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
        Blog saved = blogRepo.save(existingBlog);

        log.info("Cập nhật blog thành công id={}, title={}", saved.getId(), saved.getTitle());
        systemLogService.saveLog(
            "UPDATE_BLOG",
            "INFO",
            "ADMIN cập nhật blog có id = "+ saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }
    @Override
    public Blog createBlog(Blog blog, User admin) {
        log.info("Admin {} tạo blog '{}'",
            admin.getUsername(),
            blog.getTitle()
        );

        if (blog.getTitle() == null || blog.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Tiêu đề bài viết không được để trống");
        }
        if (blog.getSlug() == null || blog.getSlug().trim().isEmpty()) {
            throw new IllegalArgumentException("Đường dẫn tĩnh (Slug) không được để trống");
        }
        if (blogRepo.existsBySlug(blog.getSlug().trim())) {
            throw new IllegalArgumentException("Đường dẫn tĩnh (Slug) đã tồn tại trong hệ thống");
        }

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
            if (!blogCateRepo.existsById(blog.getCategory().getId())) {
                throw new IllegalArgumentException("Danh mục bài viết không hợp lệ");
            }
            BlogCategory category = new BlogCategory();
            category.setId(blog.getCategory().getId());
            blog.setCategory(category);
        } else {
            blog.setCategory(null);
        }
        Blog saved = blogRepo.save(blog);

        log.info("Tạo blog thành công id={}, title={}", saved.getId(), saved.getTitle());
        systemLogService.saveLog(
            "CREATE_BLOG",
            "INFO",
            "ADMIN tạo có id = "+ saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }
    @Override
    public Blog deleteBlog(Integer id, User admin) {
        log.warn("Admin {} xóa mềm blog id={}",
            admin.getUsername(),id);
        Blog blog = blogRepo.findById(id)
                    .orElseThrow(() ->new RuntimeException("Không tìm thấy bai viet"));
        blog.setStatus(0);
        blog.setUpdatedBy(admin);
        blog.setUpdatedAt(new Date());
        Blog saved = blogRepo.save(blog);

        log.info("Đã chuyển blog id={} sang status=0", saved.getId());
        systemLogService.saveLog(
            "DELETE_BLOG",
            "INFO",
            "ADMIN xóa blog có id = "+ saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }
}