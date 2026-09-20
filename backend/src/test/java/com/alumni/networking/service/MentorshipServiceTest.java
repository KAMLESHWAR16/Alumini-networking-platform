package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.alumni.networking.dto.MentorshipResponse;
import com.alumni.networking.model.entity.MentorshipRequest;
import com.alumni.networking.model.entity.MentorshipStatus;
import com.alumni.networking.model.entity.NotificationType;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.MentorshipRequestRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MentorshipServiceTest {
    @Mock
    private MentorshipRequestRepository mentorshipRequestRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CurrentUserResolver currentUserResolver;
    @Mock
    private NotificationService notificationService;

    private MentorshipService mentorshipService;

    @BeforeEach
    void setUp() {
        mentorshipService = new MentorshipService(mentorshipRequestRepository, userRepository, currentUserResolver, notificationService);
    }

    @Test
    void requestRejectsSelfMentorship() {
        User me = user(1L, Role.STUDENT);
        when(currentUserResolver.requireUser()).thenReturn(me);
        when(userRepository.findById(1L)).thenReturn(Optional.of(me));

        assertThrows(IllegalArgumentException.class, () -> mentorshipService.request(1L, "Please mentor me"));
    }

    @Test
    void requestNotifiesMentor() {
        User student = user(1L, Role.STUDENT);
        User mentor = user(2L, Role.ALUMNI);
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(2L)).thenReturn(Optional.of(mentor));
        when(mentorshipRequestRepository.findByPair(1L, 2L)).thenReturn(Optional.empty());
        MentorshipRequest saved = new MentorshipRequest();
        saved.setId(10L);
        saved.setStudent(student);
        saved.setMentor(mentor);
        saved.setStatus(MentorshipStatus.PENDING);
        when(mentorshipRequestRepository.save(any(MentorshipRequest.class))).thenReturn(saved);

        MentorshipResponse response = mentorshipService.request(2L, "Please mentor me");

        assertEquals(MentorshipStatus.PENDING.name(), response.status());
        verify(notificationService).notify(eq(2L), eq(NotificationType.MENTORSHIP_REQUEST), any(), eq(null));
    }

    @Test
    void respondRejectsNonMentor() {
        User student = user(1L, Role.STUDENT);
        User mentor = user(2L, Role.ALUMNI);
        MentorshipRequest request = request(10L, student, mentor, MentorshipStatus.PENDING);
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(mentorshipRequestRepository.findById(10L)).thenReturn(Optional.of(request));

        assertThrows(IllegalStateException.class, () -> mentorshipService.respond(10L, true));
        verify(notificationService, never()).notify(any(), any(), any(), any());
    }

    @Test
    void respondAcceptsAndNotifiesStudent() {
        User student = user(1L, Role.STUDENT);
        User mentor = user(2L, Role.ALUMNI);
        MentorshipRequest request = request(10L, student, mentor, MentorshipStatus.PENDING);
        when(currentUserResolver.requireUser()).thenReturn(mentor);
        when(mentorshipRequestRepository.findById(10L)).thenReturn(Optional.of(request));

        MentorshipResponse response = mentorshipService.respond(10L, true);

        assertEquals(MentorshipStatus.ACCEPTED.name(), response.status());
        verify(notificationService).notify(eq(1L), eq(NotificationType.MENTORSHIP_ACCEPTED), any(), eq(null));
    }

    private User user(Long id, Role role) {
        User user = new User();
        user.setId(id);
        user.setName(role == Role.ALUMNI ? "Alumni" : "Student");
        user.setEmail(id + "@example.com");
        user.setRole(role);
        return user;
    }

    private MentorshipRequest request(Long id, User student, User mentor, MentorshipStatus status) {
        MentorshipRequest request = new MentorshipRequest();
        request.setId(id);
        request.setStudent(student);
        request.setMentor(mentor);
        request.setMessage("Please mentor me");
        request.setStatus(status);
        return request;
    }
}