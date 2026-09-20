package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.User;

public record UserAdminResponse(
    Long id,
    String name,
    String email,
    String role,
    boolean verified,
    boolean enabled,
    Instant createdAt
) {
    public static UserAdminResponse from(User user, boolean verified) {
        return new UserAdminResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name(),
            verified,
            user.isEnabled(),
            user.getCreatedAt()
        );
    }
}