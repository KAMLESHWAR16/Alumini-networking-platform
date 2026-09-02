import React, { useState } from 'react';
import { alumni } from '../../data';

// Admin page to verify alumni accounts.
export default function ManageAlumni() {
  const [list, setList] = useState(
    alumni.map((a) => ({ id: a.id, name: a.name, company: a.company, verified: a.verified }))
  );
  const [message, setMessage] = useState('');

  const verify = (a) => {
    setList(list.map((x) => (x.id === a.id ? { ...x, verified: true } : x)));
    setMessage(`${a.name} has been verified.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Manage Alumni</h3>
      <p className="muted mb-3">Verify alumni profiles and manage their access.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle avatar-sm">{a.name.charAt(0)}</div>
                    {a.name}
                  </div>
                </td>
                <td>{a.company}</td>
                <td>
                  {a.verified ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                </td>
                <td className="text-end">
                  {!a.verified && (
                    <button className="btn btn-success btn-sm" onClick={() => verify(a)}>
                      Verify
                    </button>
                  )}
                  {a.verified && (
                    <button className="btn btn-danger btn-sm" onClick={() => verify(a)} disabled>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
