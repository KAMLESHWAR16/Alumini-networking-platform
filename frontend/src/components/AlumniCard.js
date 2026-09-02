import React from 'react';

// Card used in the alumni directory page.
export default function AlumniCard({ person, onConnect }) {
  return (
    <div className="card alumni-card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div className="avatar-circle me-3">
            {person.name.charAt(0)}
          </div>
          <div>
            <h6 className="card-title mb-0">{person.name}</h6>
            <small className="text-muted">
              {person.degree} ({person.batch})
            </small>
          </div>
        </div>
        <div className="mb-2">
          <span className="badge bg-primary me-1">{person.role}</span>
          <span className="badge bg-secondary">{person.company}</span>
        </div>
        <p className="mb-1">{person.location}</p>
        {person.verified ? (
          <span className="badge bg-success">Verified</span>
        ) : (
          <span className="badge bg-warning text-dark">Unverified</span>
        )}
        <div className="mt-2 skills-tags">
          {person.skills.map((s, i) => (
            <span className="skill-tag" key={i}>
              {s}
            </span>
          ))}
        </div>
        <button
          className="btn btn-outline-primary btn-sm w-100 mt-3"
          onClick={() => onConnect && onConnect(person)}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
