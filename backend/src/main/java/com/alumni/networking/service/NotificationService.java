package com.alumni.networking.service;

import java.util.List;

import com.alumni.networking.dto.NotificationResponse;
import com.alumni.networking.model.entity.Notification;
import com.alumni.networking.model.entity.NotificationType;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.NotificationRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;

    public NotificationService(
        NotificationRepository notificationRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver
    ) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
    }

    @Transactional
    public void notify(Long recipientId, NotificationType type, String message, String link) {
        userRepository.findById(recipientId).ifPresent(recipient -> {
            Notification notification = new Notification();
            notification.setRecipient(recipient);
            notification.setType(type);
            notification.setMessage(message);
            notification.setLink(link);
            notificationRepository.save(notification);
        });
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> myNotifications() {
        Long me = currentUserResolver.requireUser().getId();
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(me).stream()
            .map(NotificationResponse::from)
            .toList();
    }

    @Transactional(readOnly = true)
    public long unreadCount() {
        Long me = currentUserResolver.requireUser().getId();
        return notificationRepository.countByRecipientIdAndReadFalse(me);
    }

    @Transactional
    public NotificationResponse markRead(Long id) {
        Long me = currentUserResolver.requireUser().getId();
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        if (!notification.getRecipient().getId().equals(me)) {
            throw new IllegalStateException("Not allowed to modify this notification");
        }
        notification.setRead(true);
        return NotificationResponse.from(notificationRepository.save(notification));
    }

    @Transactional
    public void markAllRead() {
        Long me = currentUserResolver.requireUser().getId();
        List<Notification> unread = notificationRepository.findByRecipientIdAndReadFalse(me);
        unread.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unread);
    }
}