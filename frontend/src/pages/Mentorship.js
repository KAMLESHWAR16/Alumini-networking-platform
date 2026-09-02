import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mentorshipRequests, alumni } from '../data';

// Handles mentorship requests. The view changes a little
// depending on whether the user is a student or an alumni.
export default function Mentorship() {
  const { user } = useAuth();
  const isAlumni = user && user.role === 'alumni';
  const [requests, setRequests] = useState(mentorshipRequests);
  const [message, setMessage] = useState('');

  const sendRequest = (person) => {
    setMessage(`Mentorship request sent to ${person.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleStatus = (req, status) => {
    setRequests(
      requests.map((r) => (r.id === req.id ? { ...r, status } : r))
    );
    setMessage(`Mentorship request from ${req.from} marked as ${status}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Mentorship</h2>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row">
        {isAlumni ? (
          <div className="col-lg-7">
            <h5 className="mb-3">Mentorship Requests</h5>
            {requests.length === 0 ? (
              <p className="text-muted">No mentorship requests yet.</p>
            ) : (
              <ul className="list-group">
                {requests.map((req) => (
                  <li
                    key={req.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{req.from}</strong>
                      <br />
                      <small className="text-muted">{req.fromRole}</small>
                    </div>
                    {req.status === 'Pending' ? (
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-success"
                          onClick={() => handleStatus(req, 'Accepted')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleStatus(req, 'Declined')}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span
                        className={
                          req.status === 'Accepted'
                            ? 'badge bg-success'
                            : 'badge bg-secondary'
                        }
                      >
                        {req.status}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="col-lg-7">
            <h5 className="mb-3">Available Mentors</h5>
            <ul className="list-group">
              {alumni.slice(0, 4).map((a) => (
                <li
                  key={a.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{a.name}</strong>
                    <br />
                    <small className="text-muted">
                      {a.role} at {a.company}
                    </small>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => sendRequest(a)}
                  >
                    Request Mentorship
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* my requests - shown for everyone */}
        <div className="col-lg-5">
          <h5 className="mb-3">My Requests</h5>
          <p className="text-muted">
            {isAlumni
              ? 'You can track mentorship requests you have received above.'
              : 'Your sent mentorship requests will show up here.'}
          </p>
          <div className="card">
            <div className="card-body">
              <p className="mb-1">
                <strong>Sent: </strong>Ravi requested mentorship from you
              </p>
              <span className="badge bg-warning text-dark">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
