import React from 'react';

// Card for an alumni event.
export default function EventCard({ event, onRegister, registered }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">{event.name}</h6>
        <p className="mb-2 text-muted small">{event.about}</p>
        <p className="mb-1">
          <strong>Date:</strong> {event.date} at {event.time}
        </p>
        <p className="mb-1">
          <strong>Venue:</strong> {event.venue}
        </p>
        <p className="mb-2">
          <span className="badge bg-secondary">{event.type}</span>{' '}
          <small className="text-muted">{event.registered} registered</small>
        </p>
        <p className="mb-2 small text-muted">Organized by {event.organizer}</p>
        <button
          className="btn btn-outline-success btn-sm w-100"
          onClick={() => onRegister && onRegister(event)}
          disabled={registered}
        >
          {registered ? 'Registered' : 'Register'}
        </button>
      </div>
    </div>
  );
}
