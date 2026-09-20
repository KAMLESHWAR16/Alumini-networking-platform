package com.alumni.networking.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MentorshipSendRequest(
    @NotNull Long mentorUserId,
    @Size(max = 1000) String message
) {}