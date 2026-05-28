package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(
            @PathVariable Integer productId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return reviewService.getReviewsByProduct(productId, rating, sort);
    }
}