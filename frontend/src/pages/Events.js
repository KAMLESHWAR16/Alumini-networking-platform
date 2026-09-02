import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { events } from '../data';
import EventCard from '../components/EventCard';

// Events page with upcoming / my events / past tabs.
export default function Events() {
  const [tab, setTab] = useState('upcoming');
  const [registered, setRegistered] = useState([2]);
  const [message, setMessage] = useState('');

  const handleRegister = (ev) => {
    setRegistered([...registered, ev.id]);
    setMessage(`Registered for ${ev.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const upcoming = events.filter((e) => e.date >= '2026-09-01');
  const myEvents = events.filter((e) => registered.includes(e.id));
  const past = events.filter((e) => e.date < '2026-09-01');

  const list = {
    upcoming,
    mine: myEvents,
    past,
  }[tab] || upcoming;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h3 className="mb-0">Alumni Events</h3>
          <p className="muted mb-0">Discover, register and meet.</p>
        </div>
        <Link to="/events/create" className="btn btn-primary">
          <Plus size={16} className="me-1" /> Create Event
        </Link>
      </div>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* tabs */}
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button
            className={'nav-link ' + (tab === 'upcoming' ? 'active' : '')}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </button>
        </li>
        <li className="nav-item">
          <button
            className={'nav-link ' + (tab === 'mine' ? 'active' : '')}
            onClick={() => setTab('mine')}
          >
            My Events
          </button>
        </li>
        <li className="nav-item">
          <button
            className={'nav-link ' + (tab === 'past' ? 'active' : '')}
            onClick={() => setTab('past')}
          >
            Past
          </button>
        </li>
      </ul>

      {list.length === 0 ? (
        <p className="muted">No events in this section.</p>
      ) : (
        <div className="row">
          {list.map((ev) => (
            <div className="col-md-6 mb-3" key={ev.id}>
              <EventCard
                event={ev}
                onRegister={handleRegister}
                registered={registered.includes(ev.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
