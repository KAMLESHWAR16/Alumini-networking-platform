package com.alumni.networking.dto;

public record AdminStatsResponse(
    long totalUsers,
    long students,
    long alumni,
    long admins,
    long profiles,
    long verifiedProfiles,
    long connections,
    long mentorshipRequests,
    long jobOpportunities,
    long activeJobOpportunities,
    long events,
    long notifications
) {}