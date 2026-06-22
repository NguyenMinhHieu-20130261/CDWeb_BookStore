package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import java.util.List;
import java.util.Optional;

public interface BlogCateService {
    List<BlogCategory> getAllBlogCate();
    //admin
    Page<BlogCategory> getAllBlogCate(int page, int perPage, String sort, String filter, String order);
    Optional<BlogCategory> getBlogCateById(Integer id);
    BlogCategory createBlogCate(BlogCategory blogCategory);
    BlogCategory updateBlogCate(Integer id, BlogCategory blogCategory);
    void deleteBlogCate(Integer id);
}
