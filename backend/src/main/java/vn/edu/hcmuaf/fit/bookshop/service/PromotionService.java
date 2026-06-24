package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.Promotion;

import java.util.Optional;

public interface PromotionService {
    Page<Promotion> getAllPromotions(int page, int perPage, String sort, String filter, String order);
    Optional<Promotion> getPromotionById(Integer id);
    Promotion createPromotion(Promotion promotion);
    Promotion updatePromotion(Integer id, Promotion promotion);
    void deletePromotion(Integer id);
    boolean existsByCode(String code);
    boolean existsByName(String name);
    boolean existsByCodeAndIdNot(String code, Integer id);
    boolean existsByNameAndIdNot(String name, Integer id);
    void updateExpiredPromotions();
    Optional<Promotion> getPromotionByCode(String code);
}
