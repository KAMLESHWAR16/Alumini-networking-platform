package com.alumni.networking.service;

import java.util.List;

import com.alumni.networking.dto.AdminStatsResponse;
import com.alumni.networking.dto.UserAdminResponse;
import com.alumni.networking.model.entity.ConnectionStatus;
import com.alumni.networking.model.entity.MentorshipStatus;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ConnectionRepository;
import com.alumni.networking.repository.EventRepository;
import com.alumni.networking.repository.JobOpportunityRepository;
import com.alumni.networking.repository.MentorshipRequestRepository;
import com.alumni.networking.repository.NotificationRepository;
import com.alumni.networking.repository.ProfileRepository;
import com.alumni.networking.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;
    private final ConnectionRepository connectionRepository;
    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final JobOpportunityRepository jobOpportunityRepository;
    private final EventRepository eventRepository;
    private final NotificationRepository notificationRepository;

    public AdminService(
        UserRepository userRepository,
        ProfileRepository profileRepository,
        ProfileService profileService,
        ConnectionRepository connectionRepository,
        MentorshipRequestRepository mentorshipRequestRepository,
        JobOpportunityRepository jobOpportunityRepository,
        EventRepository eventRepository,
        NotificationRepository notificationRepository
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.profileService = profileService;
        this.connectionRepository = connectionRepository;
        this.mentorshipRequestRepository = mentorshipRequestRepository;
        this.jobOpportunityRepository = jobOpportunityRepository;
        this.eventRepository = eventRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public List<UserAdminResponse> listUsers() {
        return userRepository.findAll().stream()
            .map(user -> UserAdminResponse.from(user, isVerified(user.getId())))
            .toList();
    }

    @Transactional
    public UserAdminResponse verifyUser(Long id, boolean verified) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        com.alumni.networking.model.entity.Profile profile = profileService.getOrCreate(user);
        profile.setVerified(verified);
        profileRepository.save(profile);
        return UserAdminResponse.from(user, profile.isVerified());
    }

    @Transactional
    public UserAdminResponse deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserAdminResponse response = UserAdminResponse.from(user, isVerified(id));
        try {
            userRepository.deleteById(id);
            userRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            user.setEnabled(false);
            userRepository.save(user);
        }
        return response;
    }

    @Transactional(readOnly = true)
    public AdminStatsResponse stats() {
        return new AdminStatsResponse(
            userRepository.count(),
            userRepository.countByRole(Role.STUDENT),
            userRepository.countByRole(Role.ALUMNI),
            userRepository.countByRole(Role.ADMIN),
            profileRepository.count(),
            profileRepository.countByVerified(true),
            connectionRepository.countByStatus(ConnectionStatus.ACCEPTED),
            mentorshipRequestRepository.countByStatus(MentorshipStatus.ACCEPTED),
            jobOpportunityRepository.count(),
            jobOpportunityRepository.countByActiveTrue(),
            eventRepository.count(),
            notificationRepository.count()
        );
    }

    private boolean isVerified(Long userId) {
        return profileRepository.findByUserId(userId)
            .map(com.alumni.networking.model.entity.Profile::isVerified)
            .orElse(false);
    }
}