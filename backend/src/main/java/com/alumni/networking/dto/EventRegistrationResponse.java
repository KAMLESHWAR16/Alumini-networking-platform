package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.EventRegistration;

public record EventRegistrationResponse(
    Long id,
    Long eventId,
    String eventTitle,
    Instant startsAt,
    Long userId,
    String userName,
    Instant registeredAt
) {
    public static EventRegistrationResponse from(EventRegistration registration) {
        return new EventRegistrationResponse(
            registration.getId(),
            registration.getEvent().getId(),
            registration.getEvent().getTitle(),
            registration.getEvent().getStartsAt(),
            registration.getUser().getId(),
            registration.getUser().getName(),
            registration.getCreatedAt()
        );
    }
}