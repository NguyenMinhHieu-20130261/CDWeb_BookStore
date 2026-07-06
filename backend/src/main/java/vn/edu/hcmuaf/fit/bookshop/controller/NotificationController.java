package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.dto.notification.NotificationRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Notification;
import vn.edu.hcmuaf.fit.bookshop.repository.NotificationRepo;
import vn.edu.hcmuaf.fit.bookshop.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService notificationService;
    
    @Autowired
    private NotificationRepo notificationRepo;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getNotificationsByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUser(userId));
    }

    @GetMapping("/user/{userId}/personal")
    public ResponseEntity<?> getPersonalNotifications(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificationService.getPersonalNotifications(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNotificationById(@PathVariable Integer id) {
        return ResponseEntity.ok(notificationService.getNotificationById(id));
    }

    @GetMapping("/user/{userId}/unread-count")
    public ResponseEntity<?> countUnread(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificationService.countUnread(userId));
    }

    @PostMapping("/user")
    public ResponseEntity<?> createForUser(@RequestBody NotificationRequest request) {
        return ResponseEntity.ok(
                notificationService.createForUser(
                        request.getUserId(),
                        request.getType(),
                        request.getTitle(),
                        request.getMessage(),
                        request.getTargetUrl()
                )
        );
    }

    @PostMapping("/broadcast")
    public ResponseEntity<?> createBroadcast(@RequestBody NotificationRequest request) {
        return ResponseEntity.ok(
                notificationService.createBroadcast(
                        request.getType(),
                        request.getTitle(),
                        request.getMessage(),
                        request.getTargetUrl()
                )
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Integer id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<?> markAllAsRead(@PathVariable Integer userId) {
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok("Đã đọc tất cả thông báo");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Integer id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }
    //admin
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "DESC") String order
    ) {
        PageRequest pageRequest = PageRequest.of(
                page,
                perPage,
                Sort.by(Sort.Direction.fromString(order), sort)
        );

        Page<Notification> result = notificationRepo.findAll(pageRequest);

        return ResponseEntity.ok(Map.of(
                "data", result.getContent(),
                "total", result.getTotalElements()
        ));
    }
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createNotification(@RequestBody NotificationRequest request) {
        if (Boolean.TRUE.equals(request.getIsBroadcast())) {
            return ResponseEntity.ok(
                    notificationService.createBroadcast(
                            request.getType(),
                            request.getTitle(),
                            request.getMessage(),
                            request.getTargetUrl()
                    )
            );
        }

        return ResponseEntity.ok(
                notificationService.createForUser(
                        request.getUserId(),
                        request.getType(),
                        request.getTitle(),
                        request.getMessage(),
                        request.getTargetUrl()
                )
        );
    }
}