package com.alumni.networking.repository;

import java.util.List;

import com.alumni.networking.model.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStartsAtAfterOrderByStartsAtAsc(java.time.Instant from);
    List<Event> findByOrganizerId(Long organizerId);
    long countByOrganizerId(Long organizerId);
}