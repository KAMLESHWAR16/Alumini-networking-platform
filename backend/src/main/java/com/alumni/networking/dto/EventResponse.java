package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.Event;

public record EventResponse(
    Long id,
    String title,
    String description,
    String location,
    String type,
    Instant startsAt,
    Instant endsAt,
    int capacity,
    long registeredCount,
    boolean online,
    String meetingUrl,
    Long organizerId,
    String organizerName,
    Instant createdAt
) {
    public static EventResponse from(Event event, long registeredCount) {
        return new EventResponse(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getLocation(),
            event.getType().name(),
            event.getStartsAt(),
            event.getEndsAt(),
            event.getCapacity(),
            registeredCount,
            event.isOnline(),
            event.getMeetingUrl(),
            event.getOrganizer().getId(),
            event.getOrganizer().getName(),
            event.getCreatedAt()
        );
    }
}