package com.alumni.networking.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import com.alumni.networking.model.entity.JobOpportunity;

public record JobResponse(
    Long id,
    String title,
    String company,
    String location,
    String type,
    String experience,
    String description,
    LocalDate deadline,
    List<String> skills,
    Long postedById,
    String postedByName,
    long applicantCount,
    Instant createdAt
) {
    public static JobResponse from(JobOpportunity job, long applicantCount) {
        return new JobResponse(
            job.getId(),
            job.getTitle(),
            job.getCompany(),
            job.getLocation(),
            job.getType().name(),
            job.getExperience(),
            job.getDescription(),
            job.getDeadline(),
            job.getSkills(),
            job.getPostedBy().getId(),
            job.getPostedBy().getName(),
            applicantCount,
            job.getCreatedAt()
        );
    }
}