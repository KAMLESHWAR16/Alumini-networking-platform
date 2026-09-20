package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.EventType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record EventRequest(
    @NotBlank @Size(max = 150) String title,
    @Size(max = 3000) String description,
    @NotBlank @Size(max = 150) String location,
    @NotNull EventType type,
    @NotNull @Future Instant startsAt,
    Instant endsAt,
    @Positive int capacity,
    boolean online,
    @Size(max = 500) String meetingUrl
) {}