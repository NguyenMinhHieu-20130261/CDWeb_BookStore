package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.Blog;

import java.util.List;

public interface BlogRepo extends JpaRepository<Blog, Integer> {
    List<Blog> findByStatusOrderByCreatedAtDesc(Integer status);
    List<Blog> findByCategoryIdAndStatusOrderByCreatedAtDesc(Integer categoryId, Integer status);
}