package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import com.alumni.networking.dto.JobApplicationResponse;
import com.alumni.networking.dto.JobRequest;
import com.alumni.networking.dto.JobResponse;
import com.alumni.networking.model.entity.JobApplication;
import com.alumni.networking.model.entity.JobOpportunity;
import com.alumni.networking.model.entity.JobType;
import com.alumni.networking.model.entity.NotificationType;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.JobApplicationRepository;
import com.alumni.networking.repository.JobOpportunityRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {
    @Mock
    private JobOpportunityRepository jobOpportunityRepository;
    @Mock
    private JobApplicationRepository jobApplicationRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CurrentUserResolver currentUserResolver;
    @Mock
    private NotificationService notificationService;

    private JobService jobService;

    @BeforeEach
    void setUp() {
        jobService = new JobService(jobOpportunityRepository, jobApplicationRepository, userRepository, currentUserResolver, notificationService);
    }

    @Test
    void postRejectsStudents() {
        User student = user(1L, Role.STUDENT);
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));

        assertThrows(IllegalStateException.class, () -> jobService.post(jobRequest()));
    }

    @Test
    void postCreatesOpportunityForAlumni() {
        User alumni = user(2L, Role.ALUMNI);
        when(currentUserResolver.requireUser()).thenReturn(alumni);
        when(userRepository.findById(2L)).thenReturn(Optional.of(alumni));
        when(jobOpportunityRepository.save(any(JobOpportunity.class))).thenReturn(job(3L, alumni));

        JobResponse response = jobService.post(jobRequest());

        assertEquals("Software Engineer", response.title());
        assertEquals(2L, response.postedById());
    }

    @Test
    void applyRejectsOwnOpportunity() {
        User alumni = user(2L, Role.ALUMNI);
        JobOpportunity job = job(3L, alumni);
        when(currentUserResolver.requireUser()).thenReturn(alumni);
        when(userRepository.findById(2L)).thenReturn(Optional.of(alumni));
        when(jobOpportunityRepository.findById(3L)).thenReturn(Optional.of(job));

        assertThrows(IllegalStateException.class, () -> jobService.apply(3L));
        verify(notificationService, never()).notify(any(), any(), any(), any());
    }

    @Test
    void applyNotifiesPoster() {
        User postor = user(2L, Role.ALUMNI);
        User applicant = user(1L, Role.STUDENT);
        JobOpportunity job = job(3L, postor);
        when(currentUserResolver.requireUser()).thenReturn(applicant);
        when(userRepository.findById(1L)).thenReturn(Optional.of(applicant));
        when(jobOpportunityRepository.findById(3L)).thenReturn(Optional.of(job));
        when(jobApplicationRepository.findByJobIdAndApplicantId(3L, 1L)).thenReturn(Optional.empty());
        JobApplication saved = new JobApplication();
        saved.setId(5L);
        saved.setJob(job);
        saved.setApplicant(applicant);
        when(jobApplicationRepository.save(any(JobApplication.class))).thenReturn(saved);

        JobApplicationResponse response = jobService.apply(3L);

        assertEquals(3L, response.jobId());
        verify(notificationService).notify(eq(2L), eq(NotificationType.JOB_APPLICATION), any(), eq(null));
    }

    private User user(Long id, Role role) {
        User user = new User();
        user.setId(id);
        user.setName(role == Role.ALUMNI ? "Alumni" : "Student");
        user.setEmail(id + "@example.com");
        user.setRole(role);
        return user;
    }

    private JobRequest jobRequest() {
        return new JobRequest("Software Engineer", "Acme Corp", "Remote", JobType.FULL_TIME,
            "3+ years", "Build great software", null, List.of("Java"));
    }

    private JobOpportunity job(Long id, User poster) {
        JobOpportunity job = new JobOpportunity();
        job.setId(id);
        job.setTitle("Software Engineer");
        job.setCompany("Acme Corp");
        job.setLocation("Remote");
        job.setType(JobType.FULL_TIME);
        job.setPostedBy(poster);
        job.setActive(true);
        return job;
    }
}