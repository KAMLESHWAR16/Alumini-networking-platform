import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { opportunities } from '../data';
import JobCard from '../components/JobCard';

// Jobs and opportunities listing.
export default function Jobs() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [applied, setApplied] = useState([]);
  const [message, setMessage] = useState('');

  const handleApply = (job) => {
    setApplied([...applied, job.id]);
    setMessage(`Application submitted for ${job.title}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const filtered = opportunities.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === 'All' || j.type === type;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h3 className="mb-0">Jobs & Opportunities</h3>
          <p className="muted mb-0">Find openings posted by alumni.</p>
        </div>
        <Link to="/jobs/post" className="btn btn-primary">
          <Plus size={16} className="me-1" /> Post Job
        </Link>
      </div>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No opportunities match your filters.</p>
      ) : (
        filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            applied={applied.includes(job.id)}
          />
        ))
      )}
    </div>
  );
}
