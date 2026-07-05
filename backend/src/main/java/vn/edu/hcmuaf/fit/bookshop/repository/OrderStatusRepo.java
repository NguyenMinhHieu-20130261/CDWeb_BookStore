package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.fit.bookshop.entity.OrderStatus;

@Repository
public interface OrderStatusRepo extends JpaRepository<OrderStatus, Integer> {
}
