package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.alumni.networking.dto.ConnectionResponse;
import com.alumni.networking.model.entity.Connection;
import com.alumni.networking.model.entity.ConnectionStatus;
import com.alumni.networking.model.entity.NotificationType;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ConnectionRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ConnectionServiceTest {
    @Mock
    private ConnectionRepository connectionRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CurrentUserResolver currentUserResolver;
    @Mock
    private NotificationService notificationService;

    private ConnectionService connectionService;

    @BeforeEach
    void setUp() {
        connectionService = new ConnectionService(connectionRepository, userRepository, currentUserResolver, notificationService);
    }

    @Test
    void sendRejectsSelfConnection() {
        User me = user(1L, Role.ALUMNI);
        when(currentUserResolver.requireUser()).thenReturn(me);
        when(userRepository.findById(1L)).thenReturn(Optional.of(me));

        assertThrows(IllegalArgumentException.class, () -> connectionService.send(1L));
    }

    @Test
    void sendCreatesPendingRequestAndNotifies() {
        User me = user(1L, Role.STUDENT);
        User other = user(2L, Role.ALUMNI);
        when(currentUserResolver.requireUser()).thenReturn(me);
        when(userRepository.findById(2L)).thenReturn(Optional.of(other));
        when(connectionRepository.findByPair(1L, 2L)).thenReturn(Optional.empty());
        Connection saved = new Connection();
        saved.setId(10L);
        saved.setRequester(me);
        saved.setAddressee(other);
        saved.setStatus(ConnectionStatus.PENDING);
        when(connectionRepository.save(any(Connection.class))).thenReturn(saved);

        ConnectionResponse response = connectionService.send(2L);

        assertEquals(ConnectionStatus.PENDING.name(), response.status());
        verify(notificationService).notify(eq(2L), eq(NotificationType.CONNECTION_REQUEST), any(), eq(null));
    }

    @Test
    void acceptFailsWhenNotAddressee() {
        User me = user(1L, Role.STUDENT);
        User other = user(2L, Role.ALUMNI);
        Connection connection = new Connection();
        connection.setId(10L);
        connection.setRequester(other);
        connection.setAddressee(other);
        connection.setStatus(ConnectionStatus.PENDING);
        when(currentUserResolver.requireUser()).thenReturn(me);
        when(connectionRepository.findById(10L)).thenReturn(Optional.of(connection));

        assertThrows(IllegalStateException.class, () -> connectionService.accept(10L));
        verify(notificationService, never()).notify(any(), any(), any(), any());
    }

    @Test
    void acceptNotifiesRequester() {
        User me = user(1L, Role.ALUMNI);
        User other = user(2L, Role.STUDENT);
        Connection connection = new Connection();
        connection.setId(10L);
        connection.setRequester(other);
        connection.setAddressee(me);
        connection.setStatus(ConnectionStatus.PENDING);
        when(currentUserResolver.requireUser()).thenReturn(me);
        when(connectionRepository.findById(10L)).thenReturn(Optional.of(connection));

        ConnectionResponse response = connectionService.accept(10L);

        assertEquals(ConnectionStatus.ACCEPTED.name(), response.status());
        verify(notificationService).notify(eq(2L), eq(NotificationType.CONNECTION_ACCEPTED), any(), eq(null));
    }

    private User user(Long id, Role role) {
        User user = new User();
        user.setId(id);
        user.setName(role == Role.ALUMNI ? "Alumni" : "Student");
        user.setEmail(id + "@example.com");
        user.setRole(role);
        return user;
    }
}