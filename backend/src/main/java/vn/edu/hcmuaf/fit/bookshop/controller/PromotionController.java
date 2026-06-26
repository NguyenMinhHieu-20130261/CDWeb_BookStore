package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.Promotion;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.service.PromotionService;

import java.util.Optional;
import java.util.Map;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private vn.edu.hcmuaf.fit.bookshop.repository.OrderRepo orderRepo;

    @GetMapping("/validate")
    public ResponseEntity<?> validatePromotion(@RequestParam String code, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Integer userId = user.getId();

        Optional<Promotion> promoOpt = promotionService.getPromotionByCode(code.trim());
        if (promoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá không tồn tại"));
        }
        Promotion promotion = promoOpt.get();
        if (promotion.getStatus() == null || !promotion.getStatus()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá đã ngưng hoạt động"));
        }
        java.util.Date now = new java.util.Date();
        if (promotion.getStartDate() != null && now.before(promotion.getStartDate())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá chưa đến thời hạn sử dụng"));
        }
        if (promotion.getEndDate() != null && now.after(promotion.getEndDate())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá đã hết hạn sử dụng"));
        }
        if (userId != null) {
            boolean alreadyUsed = orderRepo.existsByUser_IdAndPromotion_Id(userId, promotion.getId());
            if (alreadyUsed) {
                return ResponseEntity.badRequest().body(Map.of("message", "Bạn đã sử dụng mã giảm giá này cho một đơn hàng trước đó"));
            }
        }
        return ResponseEntity.ok(promotion);
    }

    @GetMapping
    public ResponseEntity<Page<Promotion>> getAllPromotions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "{}") String filter,
            @RequestParam(defaultValue = "ASC") String order
    ) {
        Page<Promotion> promotions = promotionService.getAllPromotions(page, perPage, sort, filter, order);
        return ResponseEntity.ok(promotions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable Integer id) {
        Optional<Promotion> promotion = promotionService.getPromotionById(id);
        return promotion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPromotion(@RequestBody Promotion promotion) {
        // Validate required fields
        if (promotion.getCode() == null || promotion.getCode().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá không được để trống"));
        }
        if (promotion.getName() == null || promotion.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tên mã giảm giá không được để trống"));
        }
        if (promotion.getDiscountPercent() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "% Giảm giá không được để trống"));
        }
        if (promotion.getStartDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hiệu lực không được để trống"));
        }
        if (promotion.getEndDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn không được để trống"));
        }

        // Validate values range
        if (promotion.getDiscountPercent().compareTo(java.math.BigDecimal.ZERO) <= 0 
                || promotion.getDiscountPercent().compareTo(new java.math.BigDecimal("100")) > 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "% Giảm giá phải là số dương và nhỏ hơn hoặc bằng 100"));
        }
        if (promotion.getEndDate().before(promotion.getStartDate())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn phải lớn hơn hoặc bằng ngày hiệu lực"));
        }
        if (promotion.getEndDate().before(new java.util.Date())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn phải lớn hơn thời gian hiện tại"));
        }

        // Validate uniqueness
        if (promotionService.existsByCode(promotion.getCode().trim())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá này đã tồn tại, vui lòng nhập mã khác"));
        }
        if (promotionService.existsByName(promotion.getName().trim())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tên mã giảm giá này đã được sử dụng, vui lòng chọn tên khác"));
        }

        // Save
        promotion.setCode(promotion.getCode().trim());
        promotion.setName(promotion.getName().trim());
        if (promotion.getDiscountPercent() != null) {
            promotion.setDiscount(promotion.getDiscountPercent().intValue());
        }
        Promotion created = promotionService.createPromotion(promotion);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable Integer id, @RequestBody Promotion promotion) {
        // Validate existence
        if (!promotionService.getPromotionById(id).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Mã giảm giá không tồn tại"));
        }

        // Validate required fields
        if (promotion.getCode() == null || promotion.getCode().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá không được để trống"));
        }
        if (promotion.getName() == null || promotion.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tên mã giảm giá không được để trống"));
        }
        if (promotion.getDiscountPercent() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "% Giảm giá không được để trống"));
        }
        if (promotion.getStartDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hiệu lực không được để trống"));
        }
        if (promotion.getEndDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn không được để trống"));
        }

        // Validate values range
        if (promotion.getDiscountPercent().compareTo(java.math.BigDecimal.ONE) < 0 
                || promotion.getDiscountPercent().compareTo(new java.math.BigDecimal("100")) > 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "% Giảm giá phải từ 1 đến 100"));
        }
        if (promotion.getEndDate().before(promotion.getStartDate())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn phải lớn hơn hoặc bằng ngày hiệu lực"));
        }
        if (promotion.getEndDate().before(new java.util.Date())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ngày hết hạn phải lớn hơn thời gian hiện tại"));
        }

        // Validate uniqueness excluding itself
        if (promotionService.existsByCodeAndIdNot(promotion.getCode().trim(), id)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã giảm giá này đã tồn tại, vui lòng nhập mã khác"));
        }
        if (promotionService.existsByNameAndIdNot(promotion.getName().trim(), id)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tên mã giảm giá này đã được sử dụng, vui lòng chọn tên khác"));
        }

        promotion.setCode(promotion.getCode().trim());
        promotion.setName(promotion.getName().trim());
        Promotion updated = promotionService.updatePromotion(id, promotion);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Integer id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.ok().build();
    }
}
