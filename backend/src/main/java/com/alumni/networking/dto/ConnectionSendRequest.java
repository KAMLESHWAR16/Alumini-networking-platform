package com.alumni.networking.dto;

import jakarta.validation.constraints.NotNull;

public record ConnectionSendRequest(
    @NotNull Long userId
) {}