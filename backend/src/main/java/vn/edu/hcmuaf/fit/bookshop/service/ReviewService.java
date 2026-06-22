package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort);
    Map<String, Object> getReviewSummary(Integer productId);

    Page<Review> getReviews(int page, int perPage, String sort, String filter, String order);
    Review getReviewById(Integer id);
    Review updateReview(Integer id, Review reviewDetails);
    void deleteReview(Integer id);
}