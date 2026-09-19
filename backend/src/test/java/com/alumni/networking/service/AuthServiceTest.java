package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentCaptor.forClass;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.alumni.networking.dto.AuthLoginRequest;
import com.alumni.networking.dto.AuthRegisterRequest;
import com.alumni.networking.dto.AuthResponse;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;

    private PasswordEncoder passwordEncoder;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        authService = new AuthService(userRepository, passwordEncoder, authenticationManager, jwtService);
    }

    @Test
    void registrationHashesPasswordAndReturnsToken() {
        AuthRegisterRequest request = new AuthRegisterRequest(
            " Student ", "STUDENT@EXAMPLE.COM", "password123", Role.STUDENT
        );
        User savedUser = user(1L, "student@example.com", Role.STUDENT);
        when(userRepository.existsByEmailIgnoreCase("student@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtService.generateToken(savedUser)).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        assertEquals("jwt-token", response.token());
        ArgumentCaptor<User> savedUserCaptor = forClass(User.class);
        verify(userRepository).save(savedUserCaptor.capture());
        String storedPassword = savedUserCaptor.getValue().getPassword();
        assertNotEquals("password123", storedPassword);
        assertTrue(passwordEncoder.matches("password123", storedPassword));
    }

    @Test
    void publicRegistrationRejectsAdminRole() {
        AuthRegisterRequest request = new AuthRegisterRequest(
            "Admin", "admin@example.com", "password123", Role.ADMIN
        );

        assertThrows(IllegalArgumentException.class, () -> authService.register(request));
    }

    @Test
    void loginAuthenticatesCredentialsAndReturnsToken() {
        User user = user(1L, "student@example.com", Role.STUDENT);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");

        AuthResponse response = authService.login(new AuthLoginRequest("STUDENT@EXAMPLE.COM", "password123"));

        assertEquals("jwt-token", response.token());
        assertEquals("student@example.com", response.user().email());
    }

    private User user(Long id, String email, Role role) {
        User user = new User();
        user.setId(id);
        user.setName("Student");
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("password123"));
        user.setRole(role);
        return user;
    }
}