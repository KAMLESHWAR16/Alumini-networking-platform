package com.alumni.networking.dto;

import java.time.LocalDate;
import java.util.List;

import com.alumni.networking.model.entity.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record JobRequest(
    @NotBlank @Size(max = 150) String title,
    @NotBlank @Size(max = 120) String company,
    @NotBlank @Size(max = 120) String location,
    @NotNull JobType type,
    @Size(max = 100) String experience,
    @Size(max = 3000) String description,
    LocalDate deadline,
    List<@Size(max = 100) String> skills
) {}