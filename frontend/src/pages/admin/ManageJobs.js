import React, { useState } from 'react';
import { opportunities } from '../../data';

// Admin page to manage posted jobs/opportunities.
export default function ManageJobs() {
  const [list, setList] = useState(opportunities);
  const [message, setMessage] = useState('');

  const remove = (j) => {
    setList(list.filter((x) => x.id !== j.id));
    setMessage(`${j.title} has been removed.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Manage Jobs & Opportunities</h3>
      <p className="muted mb-3">Review and remove posted opportunities.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Type</th>
              <th>Posted By</th>
              <th>Applicants</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((j) => (
              <tr key={j.id}>
                <td>{j.title}</td>
                <td>{j.company}</td>
                <td>
                  <span className="badge bg-info text-dark">{j.type}</span>
                </td>
                <td>{j.postedBy}</td>
                <td>{j.applications}</td>
                <td className="text-end">
                  <button className="btn btn-danger btn-sm" onClick={() => remove(j)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
