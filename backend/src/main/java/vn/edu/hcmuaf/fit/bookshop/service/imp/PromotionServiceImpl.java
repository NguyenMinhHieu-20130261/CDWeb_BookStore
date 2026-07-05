package vn.edu.hcmuaf.fit.bookshop.service.imp;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Promotion;
import vn.edu.hcmuaf.fit.bookshop.repository.PromotionRepo;
import vn.edu.hcmuaf.fit.bookshop.service.PromotionService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepo promotionRepo;

    @Override
    public Page<Promotion> getAllPromotions(int page, int perPage, String sort, String filter, String order) {
        updateExpiredPromotions(); // Tự động cập nhật trạng thái khi truy vấn
        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));

        if (filter == null || filter.isEmpty() || filter.equals("{}")) {
            return promotionRepo.findAll(pageable);
        }

        return promotionRepo.findAll((root, query, cb) -> {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree(filter);
                List<Predicate> predicates = new ArrayList<>();

                if (json.has("status")) {
                    predicates.add(cb.equal(
                            root.get("status"),
                            json.get("status").asBoolean()
                    ));
                }

                if (json.has("q") && !json.get("q").asText().isBlank()) {
                    String q = json.get("q").asText().toLowerCase();
                    predicates.add(cb.or(
                            cb.like(cb.lower(root.get("code")), "%" + q + "%"),
                            cb.like(cb.lower(root.get("name")), "%" + q + "%")
                    ));
                }

                return cb.and(predicates.toArray(new Predicate[0]));
            } catch (Exception e) {
                return cb.conjunction();
            }
        }, pageable);
    }

    @Override
    public Optional<Promotion> getPromotionById(Integer id) {
        updateExpiredPromotions(); // Tự động cập nhật trạng thái khi truy vấn
        return promotionRepo.findById(id);
    }

    @Override
    public Promotion createPromotion(Promotion promotion) {
        if (promotion.getUsageCount() == null) {
            promotion.setUsageCount(0);
        }
        if (promotion.getStatus() == null) {
            promotion.setStatus(true);
        }
        // Set legacy fields to sensible defaults if null
        if (promotion.getIsCode() == null) {
            promotion.setIsCode(true);
        }
        return promotionRepo.save(promotion);
    }

    @Override
    public Promotion updatePromotion(Integer id, Promotion promotion) {
        Promotion existing = promotionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));

        existing.setCode(promotion.getCode());
        existing.setName(promotion.getName());
        existing.setDiscountPercent(promotion.getDiscountPercent());
        existing.setStartDate(promotion.getStartDate());
        existing.setEndDate(promotion.getEndDate());
        existing.setUsageCount(promotion.getUsageCount() != null ? promotion.getUsageCount() : 0);
        existing.setStatus(promotion.getStatus() != null ? promotion.getStatus() : true);
        
        // Also update standard discount field as integer (safeguard for legacy systems if needed)
        if (promotion.getDiscountPercent() != null) {
            existing.setDiscount(promotion.getDiscountPercent().intValue());
        }

        return promotionRepo.save(existing);
    }

    @Override
    public void deletePromotion(Integer id) {
        Promotion existing = promotionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));
        promotionRepo.delete(existing);
    }

    @Override
    public boolean existsByCode(String code) {
        return promotionRepo.existsByCode(code);
    }

    @Override
    public boolean existsByName(String name) {
        return promotionRepo.existsByName(name);
    }

    @Override
    public boolean existsByCodeAndIdNot(String code, Integer id) {
        return promotionRepo.existsByCodeAndIdNot(code, id);
    }

    @Override
    public boolean existsByNameAndIdNot(String name, Integer id) {
        return promotionRepo.existsByNameAndIdNot(name, id);
    }

    @Override
    public void updateExpiredPromotions() {
        promotionRepo.deactivateExpiredPromotions(new Date());
    }

    @Override
    public Optional<Promotion> getPromotionByCode(String code) {
        updateExpiredPromotions();
        return promotionRepo.findByCode(code);
    }
}
