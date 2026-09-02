import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Network } from 'lucide-react';
import { alumni, opportunities, events } from '../data';

// Landing page shown to visitors.
export default function Home() {
  const features = [
    {
      icon: Network,
      title: 'Networking',
      text: 'Connect with alumni working in top companies and expand your professional circle.',
      color: '#2563EB',
    },
    {
      icon: GraduationCap,
      title: 'Mentorship',
      text: 'Request guidance from seniors who have been where you are right now.',
      color: '#7C3AED',
    },
    {
      icon: Briefcase,
      title: 'Opportunities',
      text: 'Find job and internship openings shared directly by alumni.',
      color: '#16A34A',
    },
  ];

  return (
    <div>
      {/* hero */}
      <section className="hero-section">
        <div className="container py-5">
          <h1 className="fw-bold">
            Connect With Your Alumni Community
          </h1>
          <p className="lead hero-text mt-3">
            Build connections. Find mentors. Discover opportunities — all from
            the people who know your college best.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-warning btn-lg me-2">
              Join Community
            </Link>
            <Link to="/alumni" className="btn btn-outline-light btn-lg">
              Explore Alumni
            </Link>
          </div>
        </div>
      </section>

      {/* why */}
      <section className="py-5">
        <div className="container">
          <h3 className="text-center mb-4">Why AlumniConnect?</h3>
          <div className="row text-center">
            {features.map((f, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div className="card h-100">
                  <div className="card-body py-4">
                    <div
                      className="avatar-circle mx-auto mb-3"
                      style={{ backgroundColor: f.color }}
                    >
                      <f.icon size={22} />
                    </div>
                    <h5>{f.title}</h5>
                    <p className="muted">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="py-5" style={{ backgroundColor: '#eef2ff' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-6 col-md-3 mb-2">
              <h2 className="text-primary">{alumni.length}+</h2>
              <p className="muted mb-0">Alumni</p>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <h2 className="text-primary">{opportunities.length}+</h2>
              <p className="muted mb-0">Opportunities</p>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <h2 className="text-primary">{events.length}+</h2>
              <p className="muted mb-0">Events</p>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <h2 className="text-primary">100+</h2>
              <p className="muted mb-0">Connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* featured alumni */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Featured Alumni</h4>
            <Link to="/alumni" className="small">
              View all
            </Link>
          </div>
          <div className="row">
            {alumni.slice(0, 3).map((a) => (
              <div className="col-md-4 mb-3" key={a.id}>
                <div className="card h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="avatar-circle">{a.name.charAt(0)}</div>
                    <div>
                      <strong>{a.name}</strong>
                      <div className="muted small">{a.role}</div>
                      <div className="muted small">{a.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* upcoming events */}
      <section className="py-5" style={{ backgroundColor: '#eef2ff' }}>
        <div className="container">
          <h4 className="mb-4">Upcoming Events</h4>
          <div className="row">
            {events.slice(0, 3).map((ev) => (
              <div className="col-md-4 mb-3" key={ev.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h6>{ev.name}</h6>
                    <p className="mb-1 muted small">{ev.date} at {ev.time}</p>
                    <small className="muted">{ev.venue}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
