package com.alumni.networking.dto;

import java.time.Instant;

import com.alumni.networking.model.entity.JobApplication;

public record JobApplicationResponse(
    Long id,
    Long jobId,
    String jobTitle,
    String company,
    Long applicantId,
    String applicantName,
    String applicantEmail,
    String status,
    Instant createdAt
) {
    public static JobApplicationResponse from(JobApplication application) {
        return new JobApplicationResponse(
            application.getId(),
            application.getJob().getId(),
            application.getJob().getTitle(),
            application.getJob().getCompany(),
            application.getApplicant().getId(),
            application.getApplicant().getName(),
            application.getApplicant().getEmail(),
            application.getStatus().name(),
            application.getCreatedAt()
        );
    }
}