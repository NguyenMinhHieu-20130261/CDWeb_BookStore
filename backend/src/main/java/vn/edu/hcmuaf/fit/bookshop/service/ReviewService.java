package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort);
    Map<String, Object> getReviewSummary(Integer productId);
    Review updateUserReview(Integer reviewId, Integer userId, Integer rating, String cmtDetail);
    void deleteUserReview(Integer reviewId, Integer userId);    
    Review createReview(Review review);
    //admin
    Page<Review> getReviews(int page, int perPage, String sort, String filter, String order);
    Review getReviewById(Integer id);
    Review updateReviewReply(Integer id, String reply);
    void deleteReview(Integer id);
}