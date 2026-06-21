package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

import org.springframework.data.domain.Page;

import java.util.List;

public interface BlogService {
    List<Blog> getActiveBlogs();
    List<Blog> getActiveBlogsByCategory(Integer categoryId);
    Blog getBlogDetail(String slug);
    //admin
    Blog getBlogById(Integer id);
    Page<Blog> getBlogs(int page, int perPage, String sort, String filter, String order);
    Blog updateBlog(Integer id, Blog blog);
    Blog createBlog(Blog blog, User admin);
    Blog deleteBlog(Integer id, User admin);
}