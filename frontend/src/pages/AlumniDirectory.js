import React, { useState } from 'react';
import { alumni, departments } from '../data';
import AlumniCard from '../components/AlumniCard';

// Search and filter the alumni directory.
export default function AlumniDirectory() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [batch, setBatch] = useState('');
  const [message, setMessage] = useState('');

  const handleConnect = (person) => {
    setMessage(`Connection request sent to ${person.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const filtered = alumni.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === 'All' || a.department === department;
    const matchesBatch = !batch || a.batch === Number(batch);
    return matchesSearch && matchesDept && matchesBatch;
  });

  return (
    <div>
      <h3 className="mb-1">Alumni Directory</h3>
      <p className="muted">Find and connect with alumni from your college.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Batch year"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-secondary" onClick={() => {
            setSearch('');
            setDepartment('All');
            setBatch('');
          }}>
            Reset
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No alumni found for the current filters.</p>
      ) : (
        <div className="row">
          {filtered.map((person) => (
            <div className="col-md-4 mb-3" key={person.id}>
              <AlumniCard person={person} onConnect={handleConnect} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
