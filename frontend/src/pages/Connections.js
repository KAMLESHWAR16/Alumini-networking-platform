import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
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
    <div>
      <h3 className="mb-3">Connections</h3>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row g-4">
        {/* my connections */}
        <div className="col-lg-7">
          <h5 className="mb-3">My Connections</h5>
          {connections.length === 0 ? (
            <p className="muted">You have no connections yet.</p>
          ) : (
            <ul className="list-group">
              {connections.map((c) => (
                <li
                  key={c.id}
                  className="list-group-item d-flex align-items-center gap-3"
                >
                  <div className="avatar-circle avatar-sm">{c.name.charAt(0)}</div>
                  <div className="flex-grow-1">
                    <strong>{c.name}</strong>
                    <div className="muted small">
                      {c.role} at {c.company}
                    </div>
                  </div>
                  <span className="badge bg-success">Connected</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* incoming requests */}
        <div className="col-lg-5">
          <h5 className="mb-3">Connection Requests</h5>
          {requests.length === 0 ? (
            <p className="muted">No pending requests.</p>
          ) : (
            <ul className="list-group">
              {requests.map((req) => (
                <li key={req.id} className="list-group-item">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-circle avatar-sm">{req.name.charAt(0)}</div>
                    <div className="flex-grow-1">
                      <strong>{req.name}</strong>
                      <div className="muted small">
                        {req.role} at {req.company}
                      </div>
                    </div>
                  </div>
                  <div className="btn-group btn-group-sm mt-2 w-100">
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

          <div className="card mt-3">
            <div className="card-body d-flex align-items-center gap-2 muted">
              <UserPlus size={16} />
              <small>People you might know will show up here.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
