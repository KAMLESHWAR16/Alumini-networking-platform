package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.NotificationResponse;
import com.alumni.networking.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "List notifications for the current user")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> myNotifications() {
        return ResponseEntity.ok(ApiResponse.success(notificationService.myNotifications()));
    }

    @GetMapping("/unread-count")
    @Operation(summary = "Count unread notifications for the current user")
    public ResponseEntity<ApiResponse<Long>> unreadCount() {
        return ResponseEntity.ok(ApiResponse.success(notificationService.unreadCount()));
    }

    @PostMapping("/{id}/read")
    @Operation(summary = "Mark a notification as read")
    public ResponseEntity<ApiResponse<NotificationResponse>> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(notificationService.markRead(id)));
    }

    @PostMapping("/read-all")
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<ApiResponse<Void>> markAllRead() {
        notificationService.markAllRead();
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}