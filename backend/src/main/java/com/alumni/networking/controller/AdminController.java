package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.AdminStatsResponse;
import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.UserAdminResponse;
import com.alumni.networking.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    @Operation(summary = "List all users (admin only)")
    public ResponseEntity<ApiResponse<List<UserAdminResponse>>> listUsers() {
        return ResponseEntity.ok(ApiResponse.success(adminService.listUsers()));
    }

    @PutMapping("/users/{id}/verify")
    @Operation(summary = "Mark a user's profile as verified (admin only)")
    public ResponseEntity<ApiResponse<UserAdminResponse>> verifyUser(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(adminService.verifyUser(id, true)));
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete or deactivate a user (admin only)")
    public ResponseEntity<ApiResponse<UserAdminResponse>> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(adminService.deleteUser(id)));
    }

    @GetMapping("/stats")
    @Operation(summary = "Platform statistics (admin only)")
    public ResponseEntity<ApiResponse<AdminStatsResponse>> stats() {
        return ResponseEntity.ok(ApiResponse.success(adminService.stats()));
    }
}