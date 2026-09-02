import React, { useState } from 'react';
import { mentorshipRequests } from '../../data';

// Admin page to monitor mentorship requests.
export default function ManageMentorship() {
  const [requests, setRequests] = useState(mentorshipRequests);
  const [message, setMessage] = useState('');

  const update = (req, status) => {
    setRequests(requests.map((r) => (r.id === req.id ? { ...r, status } : r)));
    setMessage(`Request from ${req.from} marked as ${status}.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Manage Mentorship</h3>
      <p className="muted mb-3">Monitor mentorship requests across the platform.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.from}</td>
                <td>
                  <span
                    className={
                      'badge ' +
                      (req.status === 'Accepted'
                        ? 'bg-success'
                        : req.status === 'Declined'
                        ? 'bg-danger'
                        : 'bg-warning text-dark')
                    }
                  >
                    {req.status}
                  </span>
                </td>
                <td className="text-end">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => update(req, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => update(req, 'Declined')}
                      >
                        Decline
                      </button>
                    </>
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
