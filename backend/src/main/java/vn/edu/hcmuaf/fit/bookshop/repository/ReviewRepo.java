package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(Integer productId, Sort sort);
    List<Review> findByProductIdAndRating(Integer productId, Integer rating, Sort sort);
    List<Review> findByProduct_Id(Integer productId);
}