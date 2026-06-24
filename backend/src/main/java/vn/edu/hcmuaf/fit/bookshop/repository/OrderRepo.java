package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import vn.edu.hcmuaf.fit.bookshop.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer>{
    List<Order> findByUser_Id(Integer userId, Sort sort);
    List<Order> findByUser_Id(Integer userId);
    boolean existsByUser_IdAndPromotion_Id(Integer userId, Integer promotionId);
}
