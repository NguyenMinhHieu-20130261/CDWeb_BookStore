package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogRepo extends JpaRepository<Blog, Integer>,JpaSpecificationExecutor<Blog>  {
    List<Blog> findByStatusOrderByCreatedAtDesc(Integer status);
    List<Blog> findByCategoryIdAndStatusOrderByCreatedAtDesc(Integer categoryId, Integer status);
    Optional<Blog> findBySlugAndStatus(String slug, Integer status);
    List<Blog> findByTitleContainingIgnoreCaseAndStatusOrderByCreatedAtDesc(String keyword, Integer status);

}