package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import vn.edu.hcmuaf.fit.bookshop.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer>, JpaSpecificationExecutor<Order>{
    List<Order> findByUser_Id(Integer userId, Sort sort);
    List<Order> findByUser_Id(Integer userId);
    boolean existsByUser_IdAndPromotion_Id(Integer userId, Integer promotionId);
    //
    @Query("""
        SELECT COUNT(o) > 0
        FROM Order o
        JOIN o.orderDetails od
        WHERE o.user.id = :userId
        AND od.product.id = :productId
        AND o.status.slug = 'delivered'
    """)
    boolean existsPurchasedProduct(
            @Param("userId") Integer userId,
            @Param("productId") Integer productId
    );
}

