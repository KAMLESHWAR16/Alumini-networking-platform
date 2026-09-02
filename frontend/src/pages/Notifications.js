import React from 'react';
import { notifications } from '../data';

export default function Notifications() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-muted">You have no notifications.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                {n.text}
                <br />
                <small className="text-muted">{n.date}</small>
              </div>
              <span className="badge bg-primary rounded-pill">New</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
