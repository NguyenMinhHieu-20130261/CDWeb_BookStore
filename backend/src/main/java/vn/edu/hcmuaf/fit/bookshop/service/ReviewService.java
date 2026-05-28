package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort);
}