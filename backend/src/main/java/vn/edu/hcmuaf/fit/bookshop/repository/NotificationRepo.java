package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.Notification;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Integer userId);
    List<Notification> findByUserIdOrIsBroadcastTrueOrderByCreatedAtDesc(Integer userId);
    List<Notification> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(Integer userId);
    List<Notification> findByUserIdAndIsReadFalseOrIsBroadcastTrueAndIsReadFalseOrderByCreatedAtDesc(Integer userId);
    
    long countByUserIdAndIsReadFalse(Integer userId);
    long countByUserIdAndIsReadFalseOrIsBroadcastTrueAndIsReadFalse(Integer userId);
}