package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Notification;
import vn.edu.hcmuaf.fit.bookshop.entity.NotificationType;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.NotificationRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.NotificationService;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo notificationRepo;
    private final UserRepo userRepo;

    @Override
    public List<Notification> getNotificationsByUser(Integer userId) {
        log.debug("Lấy danh sách notification của userId={}", userId);
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);            
    }
       
    @Override
    public List<Notification> getPersonalNotifications(Integer userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Notification getNotificationById(Integer id) {
        log.debug("Lấy notification id={}", id);
        return notificationRepo.findById(id)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy notification id={}", id);
                return new RuntimeException("Không tìm thấy thông báo");
            });
    }

    @Override
    public Notification createForUser(
            Integer userId,
            NotificationType type,
            String title,
            String message,
            String targetUrl
    ) {
        log.info("Tạo notification cho userId={}, type={}, title={}", userId, type, title);
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTargetUrl(targetUrl);
        notification.setIsRead(false);
        notification.setIsBroadcast(false);

        Notification saved = notificationRepo.save(notification);

        log.info("Notification {} đã được tạo cho userId={}", saved.getId(), userId);
        return saved;
    }

    @Override
    public Notification createBroadcast(
            NotificationType type,
            String title,
            String message,
            String targetUrl
    ) {
        Notification notification = new Notification();
        notification.setUser(null);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTargetUrl(targetUrl);
        notification.setIsRead(false);
        notification.setIsBroadcast(true);
        log.info("Tạo broadcast notification: {}", title);

        Notification saved = notificationRepo.save(notification);

        log.info("Broadcast notification {} đã tạo", saved.getId());
        return saved;
    }

    @Override
    public Notification markAsRead(Integer id) {
        log.info("Đánh dấu notification {} đã đọc", id);

        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy notification id={}", id);
                    return new RuntimeException("Không tìm thấy thông báo");
                });

        notification.setIsRead(true);
        Notification saved = notificationRepo.save(notification);

        log.info("Notification {} đã được đánh dấu đã đọc", id);
        return saved;
    }

    @Override
    public void markAllAsRead(Integer userId) {
        log.info("User {} đọc tất cả notification", userId);

        List<Notification> notifications =
                notificationRepo.findByUserIdAndIsReadFalseOrIsBroadcastTrueAndIsReadFalseOrderByCreatedAtDesc(userId);

        for (Notification notification : notifications) {
            notification.setIsRead(true);
        }

        notificationRepo.saveAll(notifications);
        log.info("Đã cập nhật {} notification thành đã đọc cho userId={}", notifications.size(), userId);
    }

    @Override
    public long countUnread(Integer userId) {
        return notificationRepo.countByUserIdAndIsReadFalseOrIsBroadcastTrueAndIsReadFalse(userId);
    }

    @Override
    public void deleteNotification(Integer id) {
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông báo"));
        log.warn("Xóa notification {}", id);

        notificationRepo.delete(notification);

        log.info("Đã xóa notification {}", id);
    }
}