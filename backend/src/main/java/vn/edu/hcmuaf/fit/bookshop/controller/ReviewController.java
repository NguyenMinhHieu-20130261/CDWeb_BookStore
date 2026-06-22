package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
        Page<Review> reviews = reviewService.getReviews(page, pageSize, sort, filter, order);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Integer id, @RequestBody Review reviewDetails) {
        return ResponseEntity.ok(reviewService.updateReview(id, reviewDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
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
    public ResponseEntity<?> createReview(@RequestBody Map<String, Object> body,Authentication authentication) {
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
        review.setCreatedAt(new Date());

        reviewRepo.save(review);

        return ResponseEntity.ok("Đánh giá thành công");
    }
    @GetMapping("/product/{productId}/summary")
    public ResponseEntity<?> getReviewSummary(@PathVariable Integer productId) {
        return ResponseEntity.ok(reviewService.getReviewSummary(productId));
    }
}