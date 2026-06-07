package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Review;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort);
    Map<String, Object> getReviewSummary(Integer productId);
}