import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

// Card for an alumni event.
export default function EventCard({ event, onRegister, registered }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h6 className="card-title">{event.name}</h6>
        <p className="mb-2 muted small">{event.about}</p>
        <p className="mb-1 small">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="mb-1 small">
          <Clock size={13} className="me-1" />
          {event.time}
        </p>
        <p className="mb-1 small">
          <MapPin size={13} className="me-1" />
          {event.venue}
        </p>
        <span className="badge bg-secondary me-1">{event.type}</span>
        <small className="muted">
          {event.registered}/{event.capacity} registered
        </small>
        <div className="d-flex gap-2 mt-3">
          <Link to={`/events/${event.id}`} className="btn btn-outline-primary btn-sm flex-grow-1">
            View
          </Link>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => onRegister && onRegister(event)}
            disabled={registered}
          >
            {registered ? 'Registered' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
