package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public Page<Review> getReviews(int page, int perPage, String sort, String filter, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        String keyword = extractKeyword(filter);

        if (keyword.isBlank()) {
            return reviewRepo.findAll(pageable);
        }

        return reviewRepo.findAll((root, query, cb) ->
                cb.or(
                        cb.like(cb.lower(root.get("cmtDetail")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.join("product").get("title")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.join("user").get("username")), "%" + keyword.toLowerCase() + "%")
                ),
                pageable
        );
    }

    private String extractKeyword(String filter) {
        if (filter == null || filter.isBlank() || filter.equals("{}")) {
            return "";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(filter);

            if (node.has("q")) {
                return node.get("q").asText().trim();
            }
            if (node.has("search")) {
                return node.get("search").asText().trim();
            }

            return "";
        } catch (Exception e) {
            return filter.trim();
        }
    }

    @Override
    public Review getReviewById(Integer id) {
        return reviewRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá"));
    }

    @Override
    public Review updateReview(Integer id, Review reviewDetails) {
        Review review = getReviewById(id);
        review.setReply(reviewDetails.getReply());
        review.setUpdatedAt(new java.util.Date());
        return reviewRepo.save(review);
    }

    @Override
    public void deleteReview(Integer id) {
        if (!reviewRepo.existsById(id)) {
            throw new RuntimeException("Không tìm thấy đánh giá");
        }
        reviewRepo.deleteById(id);
    }
}