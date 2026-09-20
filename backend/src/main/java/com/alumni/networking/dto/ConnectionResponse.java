package com.alumni.networking.dto;

import com.alumni.networking.model.entity.User;

public record ConnectionResponse(
    Long id,
    Long otherUserId,
    String otherName,
    String otherRole,
    String status,
    String direction
) {
    public static ConnectionResponse fromRequest(Long id, User other, String status) {
        return new ConnectionResponse(id, other.getId(), other.getName(), other.getRole().name(), status, "outgoing");
    }

    public static ConnectionResponse fromAddress(Long id, User other, String status) {
        return new ConnectionResponse(id, other.getId(), other.getName(), other.getRole().name(), status, "incoming");
    }
}