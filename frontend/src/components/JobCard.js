import React from 'react';

// Card for a job or internship opportunity.
export default function JobCard({ job, onApply, applied }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-title mb-1">{job.title}</h6>
            <p className="mb-1 text-muted">
              {job.company} &middot; {job.location}
            </p>
          </div>
          <span className="badge bg-info text-dark">{job.type}</span>
        </div>
        <p className="mb-2">{job.description}</p>
        <div className="skills-tags mb-3">
          {job.skills.map((s, i) => (
            <span className="skill-tag" key={i}>
              {s}
            </span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Posted by {job.postedBy} on {job.addedOn}
          </small>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onApply && onApply(job)}
            disabled={applied}
          >
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
