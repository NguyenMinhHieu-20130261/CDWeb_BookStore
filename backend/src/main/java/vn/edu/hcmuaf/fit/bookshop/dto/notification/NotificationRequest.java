package vn.edu.hcmuaf.fit.bookshop.dto.notification;

import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.bookshop.entity.NotificationType;

@Getter
@Setter
public class NotificationRequest {
    private Integer userId;
    private NotificationType type;
    private String title;
    private String message;
    private String targetUrl;
}