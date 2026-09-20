package com.alumni.networking.dto;

import java.util.List;

import com.alumni.networking.model.entity.Profile;
import com.alumni.networking.model.entity.User;

public record ProfileResponse(
    Long id,
    Long userId,
    String name,
    String email,
    String role,
    boolean verified,
    String headline,
    String about,
    String department,
    Integer batch,
    String currentCompany,
    String currentRole,
    String location,
    String linkedin,
    Integer experienceYears,
    List<String> skills
) {
    public static ProfileResponse from(Profile profile) {
        User user = profile.getUser();
        return new ProfileResponse(
            profile.getId(),
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name(),
            profile.isVerified(),
            profile.getHeadline(),
            profile.getAbout(),
            profile.getDepartment(),
            profile.getBatch(),
            profile.getCurrentCompany(),
            profile.getCurrentRole(),
            profile.getLocation(),
            profile.getLinkedin(),
            profile.getExperienceYears(),
            profile.getSkills()
        );
    }
}