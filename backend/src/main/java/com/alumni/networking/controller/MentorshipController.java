package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.MentorshipResponse;
import com.alumni.networking.dto.MentorshipSendRequest;
import com.alumni.networking.service.MentorshipService;
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
@RequestMapping("/api/v1/mentorship")
@Tag(name = "Mentorship")
public class MentorshipController {
    private final MentorshipService mentorshipService;

    public MentorshipController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @PostMapping
    @Operation(summary = "Send a mentorship request to an alumni mentor")
    public ResponseEntity<ApiResponse<MentorshipResponse>> request(@Valid @RequestBody MentorshipSendRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(
            mentorshipService.request(request.mentorUserId(), request.message())
        ));
    }

    @GetMapping("/received")
    @Operation(summary = "List mentorship requests received by the current alumni")
    public ResponseEntity<ApiResponse<List<MentorshipResponse>>> received() {
        return ResponseEntity.ok(ApiResponse.success(mentorshipService.received()));
    }

    @GetMapping("/sent")
    @Operation(summary = "List mentorship requests sent by the current user")
    public ResponseEntity<ApiResponse<List<MentorshipResponse>>> sent() {
        return ResponseEntity.ok(ApiResponse.success(mentorshipService.sent()));
    }

    @GetMapping("/mentors")
    @Operation(summary = "List the accepted mentors of the current user")
    public ResponseEntity<ApiResponse<List<MentorshipResponse>>> myMentors() {
        return ResponseEntity.ok(ApiResponse.success(mentorshipService.myMentors()));
    }

    @PutMapping("/{id}/accept")
    @Operation(summary = "Accept a pending mentorship request")
    public ResponseEntity<ApiResponse<MentorshipResponse>> accept(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(mentorshipService.respond(id, true)));
    }

    @PutMapping("/{id}/decline")
    @Operation(summary = "Decline a pending mentorship request")
    public ResponseEntity<ApiResponse<MentorshipResponse>> decline(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(mentorshipService.respond(id, false)));
    }
}