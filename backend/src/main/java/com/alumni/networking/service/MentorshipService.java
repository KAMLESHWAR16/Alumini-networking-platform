package com.alumni.networking.service;

import java.time.Instant;
import java.util.List;

import com.alumni.networking.dto.MentorshipResponse;
import com.alumni.networking.model.entity.MentorshipRequest;
import com.alumni.networking.model.entity.MentorshipStatus;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.MentorshipRequestRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MentorshipService {
    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;

    public MentorshipService(
        MentorshipRequestRepository mentorshipRequestRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver
    ) {
        this.mentorshipRequestRepository = mentorshipRequestRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
    }

    @Transactional
    public MentorshipResponse request(Long mentorId, String message) {
        User student = currentUser(userRepository, currentUserResolver.requireUser().getId());
        if (student.getId().equals(mentorId)) {
            throw new IllegalArgumentException("You cannot request mentorship from yourself");
        }
        User mentor = userRepository.findById(mentorId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        mentorshipRequestRepository.findByPair(student.getId(), mentorId).ifPresent(existing -> {
            throw new IllegalArgumentException("A mentorship request already exists with this user");
        });

        MentorshipRequest request = new MentorshipRequest();
        request.setStudent(student);
        request.setMentor(mentor);
        request.setMessage(message);
        MentorshipRequest saved = mentorshipRequestRepository.save(request);
        return MentorshipResponse.fromMentor(saved.getId(), mentor, saved.getMessage(), saved.getStatus().name());
    }

    @Transactional
    public MentorshipResponse respond(Long requestId, boolean accept) {
        Long myId = currentUserResolver.requireUser().getId();
        MentorshipRequest request = mentorshipRequestRepository.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Mentorship request not found"));
        if (!request.getMentor().getId().equals(myId)) {
            throw new IllegalStateException("Not allowed to respond to this request");
        }
        if (request.getStatus() != MentorshipStatus.PENDING) {
            throw new IllegalStateException("This request was already handled");
        }
        request.setStatus(accept ? MentorshipStatus.ACCEPTED : MentorshipStatus.DECLINED);
        request.setRespondedAt(Instant.now());
        return MentorshipResponse.fromStudent(request.getId(), request.getStudent(), request.getMessage(), request.getStatus().name());
    }

    @Transactional(readOnly = true)
    public List<MentorshipResponse> received() {
        Long myId = currentUserResolver.requireUser().getId();
        return mentorshipRequestRepository.findByMentorId(myId).stream()
            .map(r -> MentorshipResponse.fromStudent(r.getId(), r.getStudent(), r.getMessage(), r.getStatus().name()))
            .toList();
    }

    @Transactional(readOnly = true)
    public List<MentorshipResponse> sent() {
        Long myId = currentUserResolver.requireUser().getId();
        return mentorshipRequestRepository.findByStudentId(myId).stream()
            .map(r -> MentorshipResponse.fromMentor(r.getId(), r.getMentor(), r.getMessage(), r.getStatus().name()))
            .toList();
    }

    @Transactional(readOnly = true)
    public List<MentorshipResponse> myMentors() {
        Long myId = currentUserResolver.requireUser().getId();
        return mentorshipRequestRepository.findByStudentIdAndStatus(myId, MentorshipStatus.ACCEPTED).stream()
            .map(r -> MentorshipResponse.fromMentor(r.getId(), r.getMentor(), r.getMessage(), r.getStatus().name()))
            .toList();
    }

    static User currentUser(UserRepository userRepository, Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    }
}