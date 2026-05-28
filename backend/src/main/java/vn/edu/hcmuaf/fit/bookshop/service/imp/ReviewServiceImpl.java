package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Review;
import vn.edu.hcmuaf.fit.bookshop.repository.ReviewRepo;
import vn.edu.hcmuaf.fit.bookshop.service.ReviewService;

import java.util.List;

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
}