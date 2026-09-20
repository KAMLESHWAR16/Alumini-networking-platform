package com.alumni.networking.service;

import java.util.List;
import java.util.Locale;

import com.alumni.networking.dto.ProfileRequest;
import com.alumni.networking.dto.ProfileResponse;
import com.alumni.networking.model.entity.Profile;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ProfileRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;

    public ProfileService(
        ProfileRepository profileRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver
    ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
    }

    @Transactional(readOnly = true)
    public ProfileResponse myProfile() {
        return ProfileResponse.from(getOrCreate(currentUserResolver.requireUser()));
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileRequest request) {
        User currentUser = userRepository.findById(currentUserResolver.requireUser().getId())
            .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
        Profile profile = getOrCreate(currentUser);
        profile.setHeadline(request.headline());
        profile.setAbout(request.about());
        profile.setDepartment(request.department());
        profile.setBatch(request.batch());
        profile.setCurrentCompany(request.currentCompany());
        profile.setCurrentRole(request.currentRole());
        profile.setLocation(request.location());
        profile.setLinkedin(request.linkedin());
        profile.setExperienceYears(request.experienceYears());
        if (request.skills() != null) {
            profile.setSkills(request.skills());
        }
        return ProfileResponse.from(profileRepository.save(profile));
    }

    @Transactional(readOnly = true)
    public List<ProfileResponse> directory(String search) {
        String keyword = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        return profileRepository.findAll().stream()
            .filter(profile -> matches(profile, keyword))
            .map(ProfileResponse::from)
            .toList();
    }

    @Transactional(readOnly = true)
    public ProfileResponse byId(Long id) {
        Profile profile = profileRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
        return ProfileResponse.from(profile);
    }

    private boolean matches(Profile profile, String keyword) {
        if (keyword.isBlank()) {
            return true;
        }
        String name = value(profile.getUser().getName());
        String company = value(profile.getCurrentCompany());
        String role = value(profile.getCurrentRole());
        return name.contains(keyword) || company.contains(keyword) || role.contains(keyword);
    }

    private String value(String s) {
        return s == null ? "" : s.toLowerCase(Locale.ROOT);
    }

    Profile getOrCreate(User user) {
        return profileRepository.findByUserId(user.getId())
            .orElseGet(() -> {
                Profile profile = new Profile();
                profile.setUser(user);
                return profileRepository.save(profile);
            });
    }
}