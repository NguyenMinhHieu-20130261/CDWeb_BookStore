package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogCateRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogCateService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;

import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BlogCateServiceImpl implements BlogCateService {
    @Autowired
    private BlogCateRepo blogCateRepo;

    @Autowired
    private SystemLogService systemLogService;

    @Override
    public List<BlogCategory> getAllBlogCate() {
        log.debug("Lấy toàn bộ danh mục blog");
        return blogCateRepo.findAll();
    }
    @Override
    public List<BlogCategory> getActiveBlogCategories() {
        return blogCateRepo.findByActiveTrue();
    }
    //admin
    @Override
    public Page<BlogCategory> getAllBlogCate(int page, int perPage, String sort, String filter, String order) {
        log.debug(
                "Admin lấy danh sách danh mục blog: page={}, perPage={}, sort={}, order={}, filter={}",
                page,perPage,sort,order,filter);
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));
        return blogCateRepo.findAll(pageable);
    }

    @Override
    public Optional<BlogCategory> getBlogCateById(Integer id) {
        log.debug("Lấy danh mục blog id={}", id);
        return blogCateRepo.findById(id);
    }

    @Override
    public BlogCategory createBlogCate(BlogCategory blogCategory) {
        log.info("Tạo danh mục blog '{}'", blogCategory.getName());
        if (blogCategory.getActive() == false) {
            blogCategory.setActive(true);
        }
        BlogCategory saved = blogCateRepo.save(blogCategory);
        log.info("Tạo danh mục blog thành công id={}, name={}", saved.getId(), saved.getName());
        systemLogService.saveLog(
            "CREATE_CATEGORY_BLOG",
            "INFO",
            "ADMIN tạo danh mục blog có id = "+ saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }

    @Override
    public BlogCategory updateBlogCate(Integer id, BlogCategory blogCategory) {
        log.info("Cập nhật danh mục blog id={}", id);
        BlogCategory old = blogCateRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy danh mục blog id={}", id);
                    return new RuntimeException("Không tìm thấy danh mục blog");
                });
        old.setName(blogCategory.getName());
        old.setActive(blogCategory.getActive());
        BlogCategory saved = blogCateRepo.save(old);
        log.info("Cập nhật danh mục blog thành công id={}, name={}", saved.getId(), saved.getName());
        systemLogService.saveLog(
            "UPDATE_CATEGORY_BLOG",
            "INFO",
            "ADMIN cập nhật danh mục blog có id = "+ saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }

    @Override
    public void deleteBlogCate(Integer id) {
        log.warn("Xóa danh mục blog id={}", id);
        BlogCategory old = blogCateRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy danh mục blog id={}", id);
                    return new RuntimeException("Không tìm thấy danh mục blog");
                });
        blogCateRepo.delete(old);
        log.info("Đã xóa danh mục blog id={}", id);
        systemLogService.saveLog(
            "DELETE_CATEGORY_BLOG",
            "INFO",
            "ADMIN xóa danh mục blog có id = "+ old.getId(),
            null,
            "ADMIN"
        );
    }
}
