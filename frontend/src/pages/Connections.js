import React, { useState } from 'react';
import { connections, connectionRequests } from '../data';

// Shows the current connections and pending connection requests.
export default function Connections() {
  const [requests, setRequests] = useState(connectionRequests);
  const [message, setMessage] = useState('');

  const handleAction = (req, action) => {
    setRequests(requests.filter((r) => r.id !== req.id));
    setMessage(`Connection request ${action} from ${req.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Connections</h2>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row">
        {/* my connections */}
        <div className="col-lg-7 mb-4">
          <h5 className="mb-3">My Connections</h5>
          <ul className="list-group">
            {connections.map((c) => (
              <li
                key={c.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{c.name}</strong>
                  <br />
                  <small className="text-muted">
                    {c.role} at {c.company}
                  </small>
                </div>
                <span className="badge bg-success">Connected</span>
              </li>
            ))}
          </ul>
        </div>

        {/* incoming requests */}
        <div className="col-lg-5">
          <h5 className="mb-3">Connection Requests</h5>
          {requests.length === 0 ? (
            <p className="text-muted">No pending requests.</p>
          ) : (
            <ul className="list-group">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{req.name}</strong>
                    <br />
                    <small className="text-muted">
                      {req.role} at {req.company}
                    </small>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-success"
                      onClick={() => handleAction(req, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAction(req, 'declined')}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
