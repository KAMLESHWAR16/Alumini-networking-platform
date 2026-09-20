package com.alumni.networking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Optional;

import com.alumni.networking.dto.EventRegistrationResponse;
import com.alumni.networking.dto.EventRequest;
import com.alumni.networking.dto.EventResponse;
import com.alumni.networking.model.entity.Event;
import com.alumni.networking.model.entity.EventRegistration;
import com.alumni.networking.model.entity.EventType;
import com.alumni.networking.model.entity.Role;
import com.alumni.networking.model.entity.User;
import com.alumni.networking.repository.EventRegistrationRepository;
import com.alumni.networking.repository.EventRepository;
import com.alumni.networking.repository.UserRepository;
import com.alumni.networking.util.CurrentUserResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {
    @Mock
    private EventRepository eventRepository;
    @Mock
    private EventRegistrationRepository eventRegistrationRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CurrentUserResolver currentUserResolver;

    private EventService eventService;

    @BeforeEach
    void setUp() {
        eventService = new EventService(eventRepository, eventRegistrationRepository, userRepository, currentUserResolver);
    }

    @Test
    void createRejectsStudents() {
        User student = user(1L, Role.STUDENT);
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));

        assertThrows(IllegalStateException.class, () -> eventService.create(eventRequest()));
    }

    @Test
    void createReturnsEventForAlumni() {
        User alumni = user(2L, Role.ALUMNI);
        when(currentUserResolver.requireUser()).thenReturn(alumni);
        when(userRepository.findById(2L)).thenReturn(Optional.of(alumni));
        when(eventRepository.save(any(Event.class))).thenReturn(event(3L, alumni));

        EventResponse response = eventService.create(eventRequest());

        assertEquals("Meetup", response.title());
        assertEquals(2L, response.organizerId());
    }

    @Test
    void registerRejectsDuplicate() {
        User student = user(1L, Role.STUDENT);
        Event event = event(3L, user(2L, Role.ALUMNI));
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(eventRepository.findById(3L)).thenReturn(Optional.of(event));
        when(eventRegistrationRepository.existsByEventIdAndUserId(3L, 1L)).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> eventService.register(3L));
        verify(eventRegistrationRepository, never()).save(any());
    }

    @Test
    void registerRejectsWhenFull() {
        User student = user(1L, Role.STUDENT);
        Event event = event(3L, user(2L, Role.ALUMNI));
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(eventRepository.findById(3L)).thenReturn(Optional.of(event));
        when(eventRegistrationRepository.existsByEventIdAndUserId(3L, 1L)).thenReturn(false);
        when(eventRegistrationRepository.countByEventId(3L)).thenReturn(100L);
        event.setCapacity(100);

        assertThrows(IllegalStateException.class, () -> eventService.register(3L));
    }

    @Test
    void registerSucceedsWhenCapacityAllows() {
        User student = user(1L, Role.STUDENT);
        Event event = event(3L, user(2L, Role.ALUMNI));
        event.setCapacity(100);
        when(currentUserResolver.requireUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(eventRepository.findById(3L)).thenReturn(Optional.of(event));
        when(eventRegistrationRepository.existsByEventIdAndUserId(3L, 1L)).thenReturn(false);
        when(eventRegistrationRepository.countByEventId(3L)).thenReturn(10L);
        EventRegistration saved = new EventRegistration();
        saved.setId(5L);
        saved.setEvent(event);
        saved.setUser(student);
        when(eventRegistrationRepository.save(any(EventRegistration.class))).thenReturn(saved);

        EventRegistrationResponse response = eventService.register(3L);

        assertEquals(3L, response.eventId());
        assertEquals(1L, response.userId());
    }

    private User user(Long id, Role role) {
        User user = new User();
        user.setId(id);
        user.setName(role == Role.ALUMNI ? "Alumni" : "Student");
        user.setEmail(id + "@example.com");
        user.setRole(role);
        return user;
    }

    private EventRequest eventRequest() {
        return new EventRequest("Meetup", "Network with alumni", "Auditorium", EventType.HANGOUT,
            Instant.now().plusSeconds(3600), null, 100, false, null);
    }

    private Event event(Long id, User organizer) {
        Event event = new Event();
        event.setId(id);
        event.setTitle("Meetup");
        event.setLocation("Auditorium");
        event.setType(EventType.HANGOUT);
        event.setStartsAt(Instant.now().plusSeconds(3600));
        event.setCapacity(100);
        event.setOrganizer(organizer);
        return event;
    }
}