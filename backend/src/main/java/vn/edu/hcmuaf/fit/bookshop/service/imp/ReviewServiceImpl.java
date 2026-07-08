package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.repository.OrderRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ReviewRepo;
import vn.edu.hcmuaf.fit.bookshop.service.ReviewService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;
import vn.edu.hcmuaf.fit.bookshop.service.ValidationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepo reviewRepo;
    private final OrderRepo orderRepo;
    private final SystemLogService systemLogService;

    @Override
    public Review createReview(Review review) {
        Integer userId = review.getUser().getId();
        Integer productId = review.getProduct().getId();

        boolean hasPurchased = orderRepo.existsPurchasedProduct(userId, productId);

        if (!hasPurchased) {
            throw new RuntimeException("Bạn chỉ có thể đánh giá sản phẩm sau khi đã mua hàng");
        }

        if (reviewRepo.existsByUser_IdAndProduct_Id(userId, productId)) {
            throw new RuntimeException("Bạn đã đánh giá sản phẩm này rồi");
        }

        review.setCreatedAt(new java.util.Date());
        review.setUpdatedAt(new java.util.Date());

        return reviewRepo.save(review);
    }

    @Override
    public List<Review> getReviewsByProduct(Integer productId, Integer rating, String sort) {
        log.debug("Lấy review productId={}, rating={}, sort={}", productId, rating, sort);
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
        log.debug("Tính tổng quan đánh giá productId={}", productId);
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
//admin
    @Override
    public Page<Review> getReviews(int page, int perPage, String sort, String filter, String order) {
        log.debug("Admin lấy danh sách review: page={}, perPage={}, sort={}, order={}, filter={}",
                page, perPage, sort,order, filter
        );
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        String keyword = extractKeyword(filter);

        if (keyword.isBlank()) {
            return reviewRepo.findAll(pageable);
        }
        log.debug("Tìm kiếm review với keyword={}", keyword);

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
        log.debug("Lấy review id={}", id);

        return reviewRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy review id={}", id);
                    return new RuntimeException("Không tìm thấy đánh giá");
                });
    }

    @Override
    public Review updateReviewReply(Integer id, String reply) {
        log.info("Admin phản hồi review id={}", id);
        Review review = getReviewById(id);
        review.setReply(reply);
        review.setUpdatedAt(new java.util.Date());
        Review saved = reviewRepo.save(review);

        log.info("Phản hồi review thành công id={}", saved.getId());
        systemLogService.saveLog(
                "REPLY_REVIEW_ADMIN",
                "INFO",
                "Admin " + " đã phản hồi review có id = " + id + " repy:" + review.getReply(),
                null,
                "USER"
        );
        return saved;
    }

    @Override
    public void deleteReview(Integer id) {
        log.warn("Xóa review id={}", id);
        if (!reviewRepo.existsById(id)) {
            throw new RuntimeException("Không tìm thấy đánh giá");
        }
        reviewRepo.deleteById(id);
        log.info("Đã xóa review id={}", id);
        systemLogService.saveLog(
                "REPLY_REVIEW_ADMIN",
                "INFO",
                "Admin " + " đã phản hồi review có id = " + id,
                null,
                "ADMIN"
        );
    }
}