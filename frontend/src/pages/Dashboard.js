import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, CalendarDays, Briefcase, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { alumni, events, opportunities } from '../data';

// Main screen after login. Shows stats, recommended alumni and upcoming events.
export default function Dashboard() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  // simple match score just for the demo - based on skill overlap and
  // whether the alumni is verified and available for mentorship.
  const recommended = alumni
    .filter((a) => a.mentorshipAvailable)
    .map((a) => {
      const base = a.verified ? 88 : 74;
      const match = Math.min(97, base + (a.experience > 5 ? 4 : 0));
      return { ...a, match };
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  const stats = [
    { label: 'Alumni', value: alumni.length, icon: Users, color: '#2563EB' },
    { label: 'Mentors', value: 45, icon: GraduationCap, color: '#7C3AED' },
    { label: 'Events', value: events.length, icon: CalendarDays, color: '#F59E0B' },
    { label: 'Jobs', value: opportunities.length, icon: Briefcase, color: '#16A34A' },
  ];

  const registerEvent = (ev) => {
    setMessage(`Registered for ${ev.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Welcome back, {user?.name.split(' ')[0]} 👋</h3>
      <p className="muted">Here is what is happening in your alumni community.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* stats */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="avatar-circle"
                  style={{ backgroundColor: s.color }}
                >
                  <s.icon size={20} />
                </div>
                <div>
                  <h4 className="mb-0">{s.value}</h4>
                  <small className="muted">{s.label}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* recommended alumni */}
        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Recommended Alumni</h5>
            <Link to="/alumni" className="small">
              View all
            </Link>
          </div>
          {recommended.map((a) => (
            <div className="card mb-3" key={a.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-circle">{a.name.charAt(0)}</div>
                  <div>
                    <strong>{a.name}</strong>
                    <div className="muted small">
                      {a.role} at {a.company}
                    </div>
                    <div className="muted small mt-1">
                      Skills: {a.skills.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
                <div className="text-center me-2">
                  <div className="score-ring" style={{ '--score': a.match }}>
                    <span>{a.match}%</span>
                  </div>
                  <small className="muted">Match</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* upcoming events */}
        <div className="col-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Upcoming Events</h5>
            <Link to="/events" className="small">
              View all
            </Link>
          </div>
          {events.slice(0, 3).map((ev) => (
            <div className="card mb-3" key={ev.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{ev.name}</strong>
                    <div className="muted small">
                      {ev.date} at {ev.time}
                    </div>
                    <div className="muted small">{ev.venue}</div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => registerEvent(ev)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
