package com.alumni.networking.controller;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.ProfileRequest;
import com.alumni.networking.dto.ProfileResponse;
import com.alumni.networking.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles")
@Tag(name = "Profiles")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/me")
    @Operation(summary = "Get the profile of the current user")
    public ResponseEntity<ApiResponse<ProfileResponse>> me() {
        return ResponseEntity.ok(ApiResponse.success(profileService.myProfile()));
    }

    @PutMapping("/me")
    @Operation(summary = "Create or update the profile of the current user")
    public ResponseEntity<ApiResponse<ProfileResponse>> update(@Valid @RequestBody ProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(profileService.updateProfile(request)));
    }

    @GetMapping
    @Operation(summary = "List the alumni/student directory with optional search")
    public ResponseEntity<ApiResponse<List<ProfileResponse>>> directory(
        @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(ApiResponse.success(profileService.directory(search)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single profile by id")
    public ResponseEntity<ApiResponse<ProfileResponse>> byId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(profileService.byId(id)));
    }
}