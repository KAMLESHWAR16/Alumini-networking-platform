import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import { opportunities } from '../data';

// Full detail view for a single opportunity.
export default function JobDetails() {
  const { id } = useParams();
  const job = opportunities.find((j) => j.id === Number(id));
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="text-center py-5">
        <p>Opportunity not found.</p>
        <Link to="/jobs" className="btn btn-primary btn-sm">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/jobs" className="small muted d-inline-flex align-items-center gap-1 mb-3">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h3 className="mb-1">{job.title}</h3>
              <p className="muted mb-1">
                <Briefcase size={15} className="me-1" />
                {job.company}
              </p>
              <p className="muted mb-2">
                <MapPin size={15} className="me-1" />
                {job.location}
              </p>
            </div>
            <span className="badge bg-info text-dark">{job.type}</span>
          </div>

          <hr />

          <h6>Job Description</h6>
          <p className="muted">{job.description}</p>

          <h6>Required Skills</h6>
          <div className="skills-tags mb-3">
            {job.skills.map((s, i) => (
              <span className="skill-tag" key={i}>
                {s}
              </span>
            ))}
          </div>

          <div className="row text-muted small mb-3">
            <div className="col-md-4 mb-2">
              <strong>Experience:</strong> {job.experience}
            </div>
            <div className="col-md-4 mb-2">
              <strong>Posted by:</strong> {job.postedBy}
            </div>
            <div className="col-md-4 mb-2">
              <strong>Posted on:</strong> {job.addedOn}
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setApplied(true)}
            disabled={applied}
          >
            {applied ? 'Applied Successfully' : `Apply for ${job.title}`}
          </button>
        </div>
      </div>
    </div>
  );
}
