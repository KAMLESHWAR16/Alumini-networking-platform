package com.alumni.networking.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.alumni.networking.dto.ConnectionResponse;
import com.alumni.networking.model.entity.Connection;
import com.alumni.networking.model.entity.ConnectionStatus;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.ConnectionRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConnectionService {
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;

    public ConnectionService(
        ConnectionRepository connectionRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver
    ) {
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
    }

    @Transactional
    public ConnectionResponse send(Long userId) {
        User currentUser = currentUser(currentUserResolver.requireUser().getId());
        if (currentUser.getId().equals(userId)) {
            throw new IllegalArgumentException("You cannot connect with yourself");
        }
        User other = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        connectionRepository.findByPair(currentUser.getId(), userId).ifPresent(existing -> {
            throw new IllegalArgumentException("A connection request already exists with this user");
        });

        Connection connection = new Connection();
        connection.setRequester(currentUser);
        connection.setAddressee(other);
        connection.setStatus(ConnectionStatus.PENDING);
        Connection saved = connectionRepository.save(connection);
        return ConnectionResponse.fromRequest(saved.getId(), other, saved.getStatus().name());
    }

    @Transactional
    public ConnectionResponse accept(Long connectionId) {
        Connection connection = ownIncoming(connectionId);
        connection.setStatus(ConnectionStatus.ACCEPTED);
        connection.setRespondedAt(Instant.now());
        return ConnectionResponse.fromAddress(connection.getId(), connection.getRequester(), connection.getStatus().name());
    }

    @Transactional
    public ConnectionResponse decline(Long connectionId) {
        Connection connection = ownIncoming(connectionId);
        connection.setStatus(ConnectionStatus.DECLINED);
        connection.setRespondedAt(Instant.now());
        return ConnectionResponse.fromAddress(connection.getId(), connection.getRequester(), connection.getStatus().name());
    }

    @Transactional(readOnly = true)
    public List<ConnectionResponse> myConnections() {
        Long myId = currentUserResolver.requireUser().getId();
        List<ConnectionResponse> result = new ArrayList<>();
        for (Connection connection : connectionRepository.findByRequesterIdAndStatus(myId, ConnectionStatus.ACCEPTED)) {
            result.add(ConnectionResponse.fromRequest(connection.getId(), connection.getAddressee(), connection.getStatus().name()));
        }
        for (Connection connection : connectionRepository.findByAddresseeIdAndStatus(myId, ConnectionStatus.ACCEPTED)) {
            result.add(ConnectionResponse.fromAddress(connection.getId(), connection.getRequester(), connection.getStatus().name()));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public List<ConnectionResponse> incomingRequests() {
        Long myId = currentUserResolver.requireUser().getId();
        return connectionRepository.findByAddresseeIdAndStatus(myId, ConnectionStatus.PENDING).stream()
            .map(c -> ConnectionResponse.fromAddress(c.getId(), c.getRequester(), c.getStatus().name()))
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ConnectionResponse> outgoingRequests() {
        Long myId = currentUserResolver.requireUser().getId();
        return connectionRepository.findByRequesterIdAndStatus(myId, ConnectionStatus.PENDING).stream()
            .map(c -> ConnectionResponse.fromRequest(c.getId(), c.getAddressee(), c.getStatus().name()))
            .toList();
    }

    private Connection ownIncoming(Long connectionId) {
        Connection connection = connectionRepository.findById(connectionId)
            .orElseThrow(() -> new IllegalArgumentException("Connection request not found"));
        if (!connection.getAddressee().getId().equals(currentUserResolver.requireUser().getId())) {
            throw new IllegalStateException("Not allowed to respond to this request");
        }
        if (connection.getStatus() != ConnectionStatus.PENDING) {
            throw new IllegalStateException("This request was already handled");
        }
        return connection;
    }

    private User currentUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    }
}