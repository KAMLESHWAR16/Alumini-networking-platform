package com.alumni.networking.model.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private NotificationType type;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(length = 500)
    private String link;

    @Column(nullable = false)
    private boolean read = false;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    public Long getId() { return id; }
    public User getRecipient() { return recipient; }
    public NotificationType getType() { return type; }
    public String getMessage() { return message; }
    public String getLink() { return link; }
    public boolean isRead() { return read; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
    public void setType(NotificationType type) { this.type = type; }
    public void setMessage(String message) { this.message = message; }
    public void setLink(String link) { this.link = link; }
    public void setRead(boolean read) { this.read = read; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}