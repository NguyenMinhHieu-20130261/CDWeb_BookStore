package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;

import java.util.List;

public interface BlogService {

    List<Blog> getActiveBlogs();

}