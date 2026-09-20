package com.alumni.networking.dto;

import java.util.List;

import jakarta.validation.constraints.Size;

public record ProfileRequest(
    @Size(max = 120) String headline,
    @Size(max = 2000) String about,
    @Size(max = 80) String department,
    Integer batch,
    @Size(max = 120) String currentCompany,
    @Size(max = 120) String currentRole,
    @Size(max = 120) String location,
    @Size(max = 200) String linkedin,
    Integer experienceYears,
    List<@Size(max = 100) String> skills
) {}