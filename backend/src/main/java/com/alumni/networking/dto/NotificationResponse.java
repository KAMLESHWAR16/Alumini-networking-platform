package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.Notification;

public record NotificationResponse(
    Long id,
    String type,
    String message,
    String link,
    boolean read,
    Instant createdAt
) {
    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
            notification.getId(),
            notification.getType().name(),
            notification.getMessage(),
            notification.getLink(),
            notification.isRead(),
            notification.getCreatedAt()
        );
    }
}