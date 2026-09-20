package com.alumni.networking.dto;

import com.alumni.networking.model.entity.User;

public record MentorshipResponse(
    Long id,
    Long otherUserId,
    String otherName,
    String otherRole,
    String message,
    String status,
    String direction
) {
    public static MentorshipResponse fromStudent(Long id, User student, String message, String status) {
        return new MentorshipResponse(id, student.getId(), student.getName(), student.getRole().name(), message, status, "received");
    }

    public static MentorshipResponse fromMentor(Long id, User mentor, String message, String status) {
        return new MentorshipResponse(id, mentor.getId(), mentor.getName(), mentor.getRole().name(), message, status, "sent");
    }
}