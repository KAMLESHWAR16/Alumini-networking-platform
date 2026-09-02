import React, { useState } from 'react';
import { events } from '../data';
import EventCard from '../components/EventCard';

export default function Events() {
  const [registered, setRegistered] = useState([]);
  const [message, setMessage] = useState('');

  const handleRegister = (ev) => {
    setRegistered([...registered, ev.id]);
    setMessage(`Registered for ${ev.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-1">Alumni Events</h2>
      <p className="text-muted">Discover and register for events.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row">
        {events.map((ev) => (
          <div className="col-md-6 mb-3" key={ev.id}>
            <EventCard
              event={ev}
              onRegister={handleRegister}
              registered={registered.includes(ev.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
