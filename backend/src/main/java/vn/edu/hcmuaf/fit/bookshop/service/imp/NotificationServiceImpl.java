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

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo notificationRepo;
    private final UserRepo userRepo;

    @Override
    public List<Notification> getNotificationsByUser(Integer userId) {
        return notificationRepo.findByUserIdOrIsBroadcastTrueOrderByCreatedAtDesc(userId);
    }

    @Override
    public List<Notification> getPersonalNotifications(Integer userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Notification getNotificationById(Integer id) {
        return notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông báo"));
    }

    @Override
    public Notification createForUser(
            Integer userId,
            NotificationType type,
            String title,
            String message,
            String targetUrl
    ) {
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

        return notificationRepo.save(notification);
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

        return notificationRepo.save(notification);
    }

    @Override
    public Notification markAsRead(Integer id) {
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông báo"));

        notification.setIsRead(true);

        return notificationRepo.save(notification);
    }

    @Override
    public void markAllAsRead(Integer userId) {
        List<Notification> notifications =
                notificationRepo.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);

        for (Notification notification : notifications) {
            notification.setIsRead(true);
        }

        notificationRepo.saveAll(notifications);
    }

    @Override
    public long countUnread(Integer userId) {
        return notificationRepo.countByUserIdAndIsReadFalse(userId);
    }

    @Override
    public void deleteNotification(Integer id) {
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông báo"));

        notificationRepo.delete(notification);
    }
}