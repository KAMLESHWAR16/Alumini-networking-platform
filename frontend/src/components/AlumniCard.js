import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';

// Card used in the alumni directory page.
export default function AlumniCard({ person, onConnect }) {
  return (
    <div className="card alumni-card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div className="avatar-circle me-3">{person.name.charAt(0)}</div>
          <div>
            <h6 className="card-title mb-0">
              {person.name}
              {person.verified && (
                <CheckCircle2 size={14} className="text-success ms-1" />
              )}
            </h6>
            <small className="muted">
              {person.degree} ({person.batch})
            </small>
          </div>
        </div>
        <div className="mb-2">
          <span className="badge bg-primary me-1">{person.role}</span>
          <span className="badge bg-secondary">{person.company}</span>
        </div>
        <p className="mb-1 muted small">
          <MapPin size={13} className="me-1" />
          {person.location}
        </p>
        {person.mentorshipAvailable && (
          <span className="badge bg-success">Available for Mentorship</span>
        )}
        <div className="skills-tags mt-2">
          {person.skills.slice(0, 3).map((s, i) => (
            <span className="skill-tag" key={i}>
              {s}
            </span>
          ))}
        </div>
        <div className="d-flex gap-2 mt-3">
          <Link to={`/alumni/${person.id}`} className="btn btn-outline-primary btn-sm flex-grow-1">
            View
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onConnect && onConnect(person)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
