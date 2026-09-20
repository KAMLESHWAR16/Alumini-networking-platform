package com.alumni.networking.service;

import java.time.Instant;
import java.util.List;

import com.alumni.networking.dto.EventRegistrationResponse;
import com.alumni.networking.dto.EventRequest;
import com.alumni.networking.dto.EventResponse;
import com.alumni.networking.model.entity.Event;
import com.alumni.networking.model.entity.EventRegistration;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.EventRegistrationRepository;
import com.alumni.networking.repository.EventRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final EventRegistrationRepository eventRegistrationRepository;
    private final UserRepository userRepository;
    private final CurrentUserResolver currentUserResolver;

    public EventService(
        EventRepository eventRepository,
        EventRegistrationRepository eventRegistrationRepository,
        UserRepository userRepository,
        CurrentUserResolver currentUserResolver
    ) {
        this.eventRepository = eventRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.userRepository = userRepository;
        this.currentUserResolver = currentUserResolver;
    }

    @Transactional
    public EventResponse create(EventRequest request) {
        User organizer = requireCurrentUser();
        if (organizer.getRole() != Role.ALUMNI && organizer.getRole() != Role.ADMIN) {
            throw new IllegalStateException("Only alumni and admins can organize events");
        }
        Event event = new Event();
        event.setTitle(request.title().trim());
        event.setDescription(request.description());
        event.setLocation(request.location().trim());
        event.setType(request.type());
        event.setStartsAt(request.startsAt());
        event.setEndsAt(request.endsAt());
        event.setCapacity(request.capacity());
        event.setOnline(request.online());
        event.setMeetingUrl(request.meetingUrl());
        event.setOrganizer(organizer);
        Event saved = eventRepository.save(event);
        return EventResponse.from(saved, 0);
    }

    @Transactional(readOnly = true)
    public List<EventResponse> listUpcoming() {
        return eventRepository.findByStartsAtAfterOrderByStartsAtAsc(Instant.now()).stream()
            .map(event -> EventResponse.from(event, eventRegistrationRepository.countByEventId(event.getId())))
            .toList();
    }

    @Transactional(readOnly = true)
    public EventResponse byId(Long id) {
        Event event = findEvent(id);
        return EventResponse.from(event, eventRegistrationRepository.countByEventId(event.getId()));
    }

    @Transactional
    public EventRegistrationResponse register(Long eventId) {
        User currentUser = requireCurrentUser();
        Event event = findEvent(eventId);
        if (eventRegistrationRepository.existsByEventIdAndUserId(eventId, currentUser.getId())) {
            throw new IllegalArgumentException("You already registered for this event");
        }
        long registered = eventRegistrationRepository.countByEventId(eventId);
        if (registered >= event.getCapacity()) {
            throw new IllegalStateException("This event is already full");
        }
        EventRegistration registration = new EventRegistration();
        registration.setEvent(event);
        registration.setUser(currentUser);
        return EventRegistrationResponse.from(eventRegistrationRepository.save(registration));
    }

    @Transactional(readOnly = true)
    public List<EventRegistrationResponse> myRegistrations() {
        Long me = requireCurrentUser().getId();
        return eventRegistrationRepository.findByUserId(me).stream()
            .map(EventRegistrationResponse::from)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<EventRegistrationResponse> attendees(Long eventId) {
        User currentUser = requireCurrentUser();
        Event event = findEvent(eventId);
        boolean isOrganizer = event.getOrganizer().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        if (!isOrganizer && !isAdmin) {
            throw new IllegalStateException("Not allowed to view attendees of this event");
        }
        return eventRegistrationRepository.findByEventId(eventId).stream()
            .map(EventRegistrationResponse::from)
            .toList();
    }

    private Event findEvent(Long id) {
        return eventRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Event not found"));
    }

    private User requireCurrentUser() {
        return userRepository.findById(currentUserResolver.requireUser().getId())
            .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    }
}