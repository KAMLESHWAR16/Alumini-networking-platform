import React from 'react';
import { Link } from 'react-router-dom';
import { alumni, opportunities, events } from '../data';

// Landing page shown to visitors.
export default function Home() {
  return (
    <div>
      {/* hero section */}
      <section className="hero-section text-center text-white">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Welcome to AlumniConnect</h1>
          <p className="lead mx-auto hero-text">
            Stay connected with your college alumni. Find career guidance,
            discover opportunities and grow your professional network.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-warning btn-lg me-2">
              Join Us
            </Link>
            <Link to="/alumni" className="btn btn-outline-light btn-lg">
              Browse Alumni
            </Link>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why AlumniConnect?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3">
                <h4>Network</h4>
                <p className="text-muted">
                  Connect with alumni working in top companies and expand your
                  professional circle.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3">
                <h4>Mentorship</h4>
                <p className="text-muted">
                  Request guidance from seniors who have been where you are
                  right now.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3">
                <h4>Opportunities</h4>
                <p className="text-muted">
                  Find job and internship openings shared directly by alumni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* quick counts */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="text-center mb-4">Meet Our Community</h3>
          <div className="row text-center">
            <div className="col-md-3 mb-2">
              <h2 className="text-primary">{alumni.length}+</h2>
              <p>Alumni</p>
            </div>
            <div className="col-md-3 mb-2">
              <h2 className="text-primary">{opportunities.length}+</h2>
              <p>Opportunities</p>
            </div>
            <div className="col-md-3 mb-2">
              <h2 className="text-primary">{events.length}+</h2>
              <p>Events</p>
            </div>
            <div className="col-md-3 mb-2">
              <h2 className="text-primary">100+</h2>
              <p>Connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* upcoming events preview */}
      <section className="py-5">
        <div className="container">
          <h3 className="mb-4">Upcoming Events</h3>
          <div className="row">
            {events.slice(0, 3).map((ev) => (
              <div className="col-md-4 mb-3" key={ev.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h6>{ev.name}</h6>
                    <p className="mb-1 text-muted">{ev.date}</p>
                    <small className="text-muted">{ev.venue}</small>
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
