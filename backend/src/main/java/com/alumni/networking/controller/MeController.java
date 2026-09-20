package com.alumni.networking.controller;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ProfileRepository;
import com.alumni.networking.util.CurrentUserResolver;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/me")
@Tag(name = "Account")
public class MeController {
    private final CurrentUserResolver currentUserResolver;
    private final ProfileRepository profileRepository;

    public MeController(CurrentUserResolver currentUserResolver, ProfileRepository profileRepository) {
        this.currentUserResolver = currentUserResolver;
        this.profileRepository = profileRepository;
    }

    @GetMapping
    @Operation(summary = "Get the authenticated user details and profile state")
    public ResponseEntity<ApiResponse<Map<String, Object>>> me() {
        User user = currentUserResolver.requireUser();
        boolean hasProfile = profileRepository.findByUserId(user.getId()).isPresent();
        return ResponseEntity.ok(ApiResponse.success(Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole().name(),
            "hasProfile", hasProfile
        )));
    }
}