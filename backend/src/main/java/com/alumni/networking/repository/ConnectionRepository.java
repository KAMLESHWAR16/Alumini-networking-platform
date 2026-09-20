package com.alumni.networking.repository;

import java.util.List;
import java.util.Optional;

import com.alumni.networking.model.entity.Connection;
import com.alumni.networking.model.entity.ConnectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    @Query("select c from Connection c " +
           "where (c.requester.id = :a and c.addressee.id = :b) " +
           "   or (c.requester.id = :b and c.addressee.id = :a)")
    Optional<Connection> findByPair(@Param("a") Long a, @Param("b") Long b);

    List<Connection> findByAddresseeId(Long addresseeId);
    List<Connection> findByRequesterIdAndStatus(Long requesterId, ConnectionStatus status);
    List<Connection> findByAddresseeIdAndStatus(Long addresseeId, ConnectionStatus status);
    List<Connection> findByRequesterId(Long requesterId);
    long countByStatus(ConnectionStatus status);
}