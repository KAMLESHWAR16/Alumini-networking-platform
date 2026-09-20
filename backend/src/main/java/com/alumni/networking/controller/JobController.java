package com.alumni.networking.controller;

import java.util.List;

import com.alumni.networking.dto.ApiResponse;
import com.alumni.networking.dto.JobApplicationResponse;
import com.alumni.networking.dto.JobRequest;
import com.alumni.networking.dto.JobResponse;
import com.alumni.networking.service.JobService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jobs")
@Tag(name = "Opportunities")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    @Operation(summary = "List active opportunities with optional search")
    public ResponseEntity<ApiResponse<List<JobResponse>>> list(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(jobService.list(search)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single opportunity by id")
    public ResponseEntity<ApiResponse<JobResponse>> byId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(jobService.byId(id)));
    }

    @PostMapping
    @Operation(summary = "Post a new opportunity (alumni or admin)")
    public ResponseEntity<ApiResponse<JobResponse>> post(@Valid @RequestBody JobRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(jobService.post(request)));
    }

    @PostMapping("/{id}/apply")
    @Operation(summary = "Apply for an opportunity")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> apply(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(jobService.apply(id)));
    }

    @GetMapping("/applications/mine")
    @Operation(summary = "List the applications submitted by the current user")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> myApplications() {
        return ResponseEntity.ok(ApiResponse.success(jobService.myApplications()));
    }
}