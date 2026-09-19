package com.alumni.networking.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;

class JwtServiceTest {
    private final JwtService jwtService = new JwtService("test-secret", 60_000);

    @Test
    void generatesAndValidatesTokenForUser() {
        User user = user();

        String token = jwtService.generateToken(user);

        assertEquals("student@example.com", jwtService.extractUsername(token));
        assertTrue(jwtService.isTokenValid(token, user));
    }

    private User user() {
        User user = new User();
        user.setId(1L);
        user.setName("Student");
        user.setEmail("student@example.com");
        user.setPassword("encoded-password");
        user.setRole(Role.STUDENT);
        return user;
    }
}