package com.alumni.networking.service;

import java.util.List;
import java.util.Locale;

import com.alumni.networking.dto.JobApplicationResponse;
import com.alumni.networking.dto.JobRequest;
import com.alumni.networking.dto.JobResponse;
import com.alumni.networking.model.entity.JobApplication;
import com.alumni.networking.model.entity.JobOpportunity;
import com.alumni.networking.model.entity.NotificationType;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.JobApplicationRepository;
import com.alumni.networking.repository.JobOpportunityRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobService {
    private final JobOpportunityRepository jobOpportunityRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;
    private final NotificationService notificationService;

    public JobService(
        JobOpportunityRepository jobOpportunityRepository,
        JobApplicationRepository jobApplicationRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver,
        NotificationService notificationService
    ) {
        this.jobOpportunityRepository = jobOpportunityRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
        this.notificationService = notificationService;
    }

    @Transactional
    public JobResponse post(JobRequest request) {
        User currentUser = requireCurrentUser();
        if (currentUser.getRole() != Role.ALUMNI && currentUser.getRole() != Role.ADMIN) {
            throw new IllegalStateException("Only alumni and admins can post opportunities");
        }
        JobOpportunity job = new JobOpportunity();
        job.setTitle(request.title().trim());
        job.setCompany(request.company().trim());
        job.setLocation(request.location().trim());
        job.setType(request.type());
        job.setExperience(request.experience());
        job.setDescription(request.description());
        job.setDeadline(request.deadline());
        job.setSkills(request.skills() == null ? List.of() : request.skills());
        job.setPostedBy(currentUser);
        JobOpportunity saved = jobOpportunityRepository.save(job);
        return JobResponse.from(saved, 0);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> list(String search) {
        List<JobOpportunity> jobs = jobOpportunityRepository.findByActiveTrue();
        String keyword = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        return jobs.stream()
            .filter(job -> job.getTitle().toLowerCase(Locale.ROOT).contains(keyword)
                || job.getCompany().toLowerCase(Locale.ROOT).contains(keyword)
                || job.getLocation().toLowerCase(Locale.ROOT).contains(keyword))
            .map(job -> JobResponse.from(job, jobApplicationRepository.countByJobId(job.getId())))
            .toList();
    }

    @Transactional(readOnly = true)
    public JobResponse byId(Long id) {
        JobOpportunity job = findActive(id);
        return JobResponse.from(job, jobApplicationRepository.countByJobId(job.getId()));
    }

    @Transactional
    public JobApplicationResponse apply(Long jobId) {
        User currentUser = requireCurrentUser();
        if (currentUser.getRole() == Role.ADMIN) {
            throw new IllegalStateException("Admins cannot apply for opportunities");
        }
        JobOpportunity job = findActive(jobId);
        if (job.getPostedBy().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("You cannot apply for your own opportunity");
        }
        jobApplicationRepository.findByJobIdAndApplicantId(jobId, currentUser.getId()).ifPresent(existing -> {
            throw new IllegalArgumentException("You already applied for this opportunity");
        });
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setApplicant(currentUser);
        JobApplication saved = jobApplicationRepository.save(application);
        notificationService.notify(job.getPostedBy().getId(), NotificationType.JOB_APPLICATION,
            currentUser.getName() + " applied for " + job.getTitle() + " at " + job.getCompany(), null);
        return JobApplicationResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> myApplications() {
        Long me = requireCurrentUser().getId();
        return jobApplicationRepository.findByApplicantId(me).stream()
            .map(JobApplicationResponse::from)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> applicationsFor(Long jobId) {
        User currentUser = requireCurrentUser();
        JobOpportunity job = findActive(jobId);
        boolean isPoster = job.getPostedBy().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        if (!isPoster && !isAdmin) {
            throw new IllegalStateException("Not allowed to view applications for this opportunity");
        }
        return jobApplicationRepository.findByJobId(jobId).stream()
            .map(JobApplicationResponse::from)
            .toList();
    }

    private JobOpportunity findActive(Long id) {
        JobOpportunity job = jobOpportunityRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Opportunity not found"));
        if (!job.isActive()) {
            throw new IllegalArgumentException("Opportunity not found");
        }
        return job;
    }

    private User requireCurrentUser() {
        return userRepository.findById(currentUserResolver.requireUser().getId())
            .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    }
}