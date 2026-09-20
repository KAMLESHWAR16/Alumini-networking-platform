package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.ConnectionResponse;
import com.alumni.networking.dto.ConnectionSendRequest;
import com.alumni.networking.service.ConnectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/connections")
@Tag(name = "Connections")
public class ConnectionController {
    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping
    @Operation(summary = "Send a connection request to another user")
    public ResponseEntity<ApiResponse<ConnectionResponse>> send(@Valid @RequestBody ConnectionSendRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(connectionService.send(request.userId())));
    }

    @GetMapping
    @Operation(summary = "List the accepted connections of the current user")
    public ResponseEntity<ApiResponse<List<ConnectionResponse>>> myConnections() {
        return ResponseEntity.ok(ApiResponse.success(connectionService.myConnections()));
    }

    @GetMapping("/requests/incoming")
    @Operation(summary = "List pending connection requests sent to the current user")
    public ResponseEntity<ApiResponse<List<ConnectionResponse>>> incoming() {
        return ResponseEntity.ok(ApiResponse.success(connectionService.incomingRequests()));
    }

    @GetMapping("/requests/outgoing")
    @Operation(summary = "List pending connection requests sent by the current user")
    public ResponseEntity<ApiResponse<List<ConnectionResponse>>> outgoing() {
        return ResponseEntity.ok(ApiResponse.success(connectionService.outgoingRequests()));
    }

    @PutMapping("/{id}/accept")
    @Operation(summary = "Accept a pending connection request")
    public ResponseEntity<ApiResponse<ConnectionResponse>> accept(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(connectionService.accept(id)));
    }

    @PutMapping("/{id}/decline")
    @Operation(summary = "Decline a pending connection request")
    public ResponseEntity<ApiResponse<ConnectionResponse>> decline(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(connectionService.decline(id)));
    }
}