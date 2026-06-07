package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.repository.ReviewRepo;
import vn.edu.hcmuaf.fit.bookshop.service.ReviewService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepo reviewRepo;

    @Override
    public List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort) {
        Sort reviewSort;
        if ("oldest".equalsIgnoreCase(sort)) {
            reviewSort = Sort.by(Sort.Direction.ASC, "createdAt");
        } else {
            reviewSort = Sort.by(Sort.Direction.DESC, "createdAt");
        }
        if (rating != null) {
            return reviewRepo.findByProductIdAndRating(productId, rating, reviewSort);
        }
        return reviewRepo.findByProductId(productId, reviewSort);
    }
    @Override
    public Map<String, Object> getReviewSummary(Integer productId) {
        List<Review> reviews = reviewRepo.findByProduct_Id(productId);
        long totalReviews = reviews.size();

        double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        Map<String, Object> result = new HashMap<>();
        result.put("averageRating", averageRating);
        result.put("totalReviews", totalReviews);
        return result;
    }
}