import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import { events } from '../data';

// Full detail view of an event.
export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="text-center py-5">
        <p>Event not found.</p>
        <Link to="/events" className="btn btn-primary btn-sm">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/events" className="small muted d-inline-flex align-items-center gap-1 mb-3">
        <ArrowLeft size={14} /> Back to Events
      </Link>
      <div className="card">
        <div className="card-body">
          <h3 className="mb-1">{event.name}</h3>
          <span className="badge bg-secondary mb-3">{event.type}</span>
          <p className="muted">{event.about}</p>

          <div className="row text-muted small mb-3">
            <div className="col-md-4 mb-2">
              <Clock size={14} className="me-1" />
              {event.date} at {event.time}
            </div>
            <div className="col-md-4 mb-2">
              <MapPin size={14} className="me-1" />
              {event.venue}
            </div>
            <div className="col-md-4 mb-2">
              <Users size={14} className="me-1" />
              {event.registered} / {event.capacity} registered
            </div>
          </div>

          <p className="small muted mb-3">Organized by {event.organizer}</p>

          <button
            className="btn btn-primary"
            onClick={() => setRegistered(true)}
            disabled={registered}
          >
            {registered ? 'Registered' : 'Register for this event'}
          </button>
        </div>
      </div>
    </div>
  );
}
