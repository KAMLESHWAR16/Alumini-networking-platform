import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, CheckCircle2, Check } from 'lucide-react';
import { alumni } from '../data';

// Detailed profile view of a single alumni.
export default function AlumniProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = alumni.find((a) => a.id === Number(id));
  const [message, setMessage] = useState('');

  if (!person) {
    return (
      <div className="text-center py-5">
        <p>Alumni not found.</p>
        <Link to="/alumni" className="btn btn-primary btn-sm">
          Back to Directory
        </Link>
      </div>
    );
  }

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <Link to="/alumni" className="small muted d-inline-flex align-items-center gap-1 mb-3">
        <ArrowLeft size={14} /> Back to Directory
      </Link>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* header */}
      <div className="card mb-4">
        <div className="card-body d-flex flex-wrap align-items-center gap-3">
          <div className="avatar-circle avatar-lg">{person.name.charAt(0)}</div>
          <div className="flex-grow-1">
            <h4 className="mb-1">
              {person.name}
              {person.verified && (
                <CheckCircle2 size={18} className="text-success ms-2" />
              )}
            </h4>
            <p className="mb-1 fw-medium">{person.role}</p>
            <p className="muted mb-1">
              <Briefcase size={14} className="me-1" />
              {person.company}
              <span className="mx-2">•</span>
              <MapPin size={14} className="me-1" />
              {person.location}
            </p>
            <p className="muted mb-0 small">
              {person.industry} • {person.experience} years experience • Batch {person.batch}
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => notify(`Connection request sent to ${person.name}`)}>
              Connect
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate('/messages')}
            >
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {/* about */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="mb-2">About</h6>
              <p className="muted mb-0">{person.about}</p>
            </div>
          </div>

          {/* skills */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="mb-3">Skills</h6>
              <div className="skills-tags">
                {person.skills.map((s, i) => (
                  <span className="skill-tag" key={i}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* education */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="mb-2">Education</h6>
              <p className="mb-1 fw-medium">{person.degree}</p>
              <p className="muted mb-0">
                {person.department} • Class of {person.batch}
              </p>
            </div>
          </div>

          {/* can help with */}
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">
                Can Help With{' '}
                <span className="fw-normal muted small">(as a mentor)</span>
              </h6>
              <div className="row">
                {person.helpWith.map((h) => (
                  <div className="col-md-6 mb-2" key={h}>
                    <Check className="text-success me-2" size={16} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* side */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Mentorship</h6>
              {person.mentorshipAvailable ? (
                <>
                  <p className="muted small">
                    {person.name} is available to mentor you.
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => notify(`Mentorship request sent to ${person.name}`)}
                  >
                    Request Mentorship
                  </button>
                </>
              ) : (
                <p className="muted small">
                  Currently not accepting new mentorship requests.
                </p>
              )}
              <hr />
              <div className="muted small">
                LinkedIn: {person.linkedin}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
