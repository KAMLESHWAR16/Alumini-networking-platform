package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.EventRegistrationResponse;
import com.alumni.networking.dto.EventRequest;
import com.alumni.networking.dto.EventResponse;
import com.alumni.networking.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "Events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "List upcoming events")
    public ResponseEntity<ApiResponse<List<EventResponse>>> listUpcoming() {
        return ResponseEntity.ok(ApiResponse.success(eventService.listUpcoming()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single event by id")
    public ResponseEntity<ApiResponse<EventResponse>> byId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(eventService.byId(id)));
    }

    @PostMapping
    @Operation(summary = "Create a new event (alumni or admin)")
    public ResponseEntity<ApiResponse<EventResponse>> create(@Valid @RequestBody EventRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(eventService.create(request)));
    }

    @PostMapping("/{id}/register")
    @Operation(summary = "Register for an event")
    public ResponseEntity<ApiResponse<EventRegistrationResponse>> register(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(eventService.register(id)));
    }

    @GetMapping("/registrations/mine")
    @Operation(summary = "List the event registrations of the current user")
    public ResponseEntity<ApiResponse<List<EventRegistrationResponse>>> myRegistrations() {
        return ResponseEntity.ok(ApiResponse.success(eventService.myRegistrations()));
    }
}