package com.alumni.networking.dto;

import com.alumni.networking.model.entity.User;

public record AuthResponse(String token, UserData user) {
    public static AuthResponse from(String token, User user) {
        return new AuthResponse(token, new UserData(user.getId(), user.getName(), user.getEmail(), user.getRole().name()));
    }

    public record UserData(Long id, String name, String email, String role) {}
}