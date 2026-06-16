package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BlogService {
    List<Blog> getActiveBlogs();
    List<Blog> getActiveBlogsByCategory(Integer categoryId);
    Blog getBlogDetail(String slug);
    Page<Blog> getBlogs(int page, int perPage, String sort, String filter, String order);
}