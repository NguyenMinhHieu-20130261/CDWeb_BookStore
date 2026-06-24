package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.fit.bookshop.entity.Promotion;

import java.util.Optional;
import java.util.Date;

@Repository
public interface PromotionRepo extends JpaRepository<Promotion, Integer>, JpaSpecificationExecutor<Promotion> {
    Optional<Promotion> findByCode(String code);
    Optional<Promotion> findByName(String name);
    boolean existsByCode(String code);
    boolean existsByName(String name);
    boolean existsByCodeAndIdNot(String code, Integer id);
    boolean existsByNameAndIdNot(String name, Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE Promotion p SET p.status = false WHERE p.status = true AND p.endDate < :now")
    void deactivateExpiredPromotions(@Param("now") Date now);
}
