package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ReviewRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
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
    private final UserRepo userRepo;
    private final ProductRepo prodRepo;

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(
            @PathVariable Integer productId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return reviewService.getReviewsByProduct(productId, rating, sort);
    }
    @PostMapping("/add")
    public ResponseEntity<?> createReview(@RequestBody Map<String, Object> body) {
        Integer productId = Integer.valueOf(body.get("productId").toString());
        Integer userId = Integer.valueOf(body.get("userId").toString());
        Integer rating = Integer.valueOf(body.get("rating").toString());
        String cmtDetail = body.get("cmtDetail").toString();

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

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
}