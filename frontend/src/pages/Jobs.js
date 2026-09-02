import React, { useState } from 'react';
import { opportunities } from '../data';
import JobCard from '../components/JobCard';

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
    <div className="container py-4">
      <h2 className="mb-1">Job & Internship Opportunities</h2>
      <p className="text-muted">Find openings posted by alumni.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row g-2 mb-4">
        <div className="col-md-6">
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
        <p className="text-muted">No opportunities match your filters.</p>
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
