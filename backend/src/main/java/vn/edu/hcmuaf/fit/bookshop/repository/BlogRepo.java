package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.edu.hcmuaf.fit.bookshop.entity.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogRepo extends JpaRepository<Blog, Integer>,JpaSpecificationExecutor<Blog>  {
    boolean existsBySlug(String slug);
    List<Blog> findByStatusOrderByCreatedAtDesc(Integer status);
    List<Blog> findByCategoryIdAndStatusOrderByCreatedAtDesc(Integer categoryId, Integer status);
    Optional<Blog> findBySlugAndStatus(String slug, Integer status);
    List<Blog> findByTitleContainingIgnoreCaseAndStatusOrderByCreatedAtDesc(String keyword, Integer status);
    Page<Blog> findByStatus(Integer status, Pageable pageable);

    Page<Blog> findByStatusAndCategoryId( Integer status, Integer categoryId, Pageable pageable );

    @Query("""
        SELECT b
        FROM Blog b
        LEFT JOIN b.category c
        WHERE b.status = :status
        AND (b.category IS NULL OR c.active = true)
    """)
    Page<Blog> findActiveBlogsSafe(
            @Param("status") Integer status,
            Pageable pageable
    );
    @Query("""
        SELECT b
        FROM Blog b
        JOIN b.category c
        WHERE b.status = :status
        AND c.id = :categoryId
        AND c.active = true
    """)
    Page<Blog> findActiveBlogsByCategorySafe(
            @Param("status") Integer status,
            @Param("categoryId") Integer categoryId,
            Pageable pageable
    );
}