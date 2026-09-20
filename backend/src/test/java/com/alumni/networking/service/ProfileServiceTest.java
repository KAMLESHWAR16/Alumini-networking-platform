package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.alumni.networking.dto.ProfileResponse;
import com.alumni.networking.model.entity.Profile;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ProfileRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {
    @Mock
    private ProfileRepository profileRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CurrentUserResolver currentUserResolver;

    private ProfileService profileService;

    @BeforeEach
    void setUp() {
        profileService = new ProfileService(profileRepository, userRepository, currentUserResolver);
    }

    @Test
    void myProfileReturnsExistingProfile() {
        User user = user(1L, Role.STUDENT);
        Profile profile = profile(user, false);
        when(currentUserResolver.requireUser()).thenReturn(user);
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

        ProfileResponse response = profileService.myProfile();

        assertEquals(profile.getId(), response.id());
        assertEquals(1L, response.userId());
        assertEquals("Student", response.name());
    }

    @Test
    void myProfileCreatesAndSavesProfileWhenMissing() {
        User user = user(1L, Role.STUDENT);
        when(currentUserResolver.requireUser()).thenReturn(user);
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.empty());
        when(profileRepository.save(any(Profile.class))).thenReturn(new Profile());

        profileService.myProfile();

        verify(profileRepository).save(any(Profile.class));
    }

    @Test
    void byIdRejectsUnknownProfile() {
        when(profileRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> profileService.byId(99L));
    }

    private User user(Long id, Role role) {
        User user = new User();
        user.setId(id);
        user.setName("Student");
        user.setEmail("student@example.com");
        user.setRole(role);
        return user;
    }

    private Profile profile(User user, boolean verified) {
        Profile profile = new Profile();
        profile.setId(1L);
        profile.setUser(user);
        profile.setVerified(verified);
        profile.setHeadline("Software Engineer");
        return profile;
    }
}