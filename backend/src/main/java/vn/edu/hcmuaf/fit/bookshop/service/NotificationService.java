package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.Notification;
import vn.edu.hcmuaf.fit.bookshop.entity.NotificationType;

import java.util.List;

public interface NotificationService {

    List<Notification> getNotificationsByUser(Integer userId);

    List<Notification> getPersonalNotifications(Integer userId);

    Notification getNotificationById(Integer id);

    Notification createForUser(
            Integer userId,
            NotificationType type,
            String title,
            String message,
            String targetUrl
    );

    Notification createBroadcast(
            NotificationType type,
            String title,
            String message,
            String targetUrl
    );

    Notification markAsRead(Integer id);

    void markAllAsRead(Integer userId);

    long countUnread(Integer userId);

    void deleteNotification(Integer id);
}