package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
}