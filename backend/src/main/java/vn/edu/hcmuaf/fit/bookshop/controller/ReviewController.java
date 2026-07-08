package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ReviewRepo;
import vn.edu.hcmuaf.fit.bookshop.service.ReviewService;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewRepo reviewRepo;
    private final ProductRepo prodRepo;

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(
            @PathVariable Integer productId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return reviewService.getReviewsByProduct(productId, rating, sort);
    }
    @PostMapping("/add")
    public ResponseEntity<?> createReview(
            @RequestBody Map<String, Object> body,
            Authentication authentication
    ) {
        try {
            Integer productId = Integer.valueOf(body.get("productId").toString());
            Integer rating = Integer.valueOf(body.get("rating").toString());
            String cmtDetail = body.get("cmtDetail").toString();

            User user = (User) authentication.getPrincipal();

            Product product = prodRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

            Review review = new Review();
            review.setUser(user);
            review.setProduct(product);
            review.setRating(rating);
            review.setCmtDetail(cmtDetail);

            Review saved = reviewService.createReview(review);

            return ResponseEntity.ok(saved);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", e.getMessage()
            ));
        }
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateMyReview(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> body,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        Integer rating = Integer.valueOf(body.get("rating").toString());
        String cmtDetail = body.get("cmtDetail").toString();

        Review updated = reviewService.updateUserReview(id, user.getId(), rating, cmtDetail);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteMyReview(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        reviewService.deleteUserReview(id, user.getId());

        return ResponseEntity.ok("Xóa đánh giá thành công");
    }
    //admin
    @GetMapping
    public ResponseEntity<Page<Review>> getReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) Integer perPage,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "") String filter,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        int pageSize = perPage != null ? perPage : (size != null ? size : 10);
        if ("{}".equals(filter)) {
            filter = "";
        }
        if (sort == null || sort.isBlank() ||
            sort.contains(".") || sort.equals("product") ||
            sort.equals("user")
        ) {
            sort = "createdAt";
        }
        Page<Review> reviews = reviewService.getReviews(page,pageSize,sort,filter,order);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Review> updateReview(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> body
    ) {
        String reply = body.get("reply") != null
                ? body.get("reply").toString()
                : null;
        return ResponseEntity.ok(
                reviewService.updateReviewReply(id, reply)
        );
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/product/{productId}/summary")
    public ResponseEntity<?> getReviewSummary(@PathVariable Integer productId) {
        return ResponseEntity.ok(reviewService.getReviewSummary(productId));
    }
}