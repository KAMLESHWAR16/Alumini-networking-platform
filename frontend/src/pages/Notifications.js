import React from 'react';
import { notifications } from '../data';

// Notifications / alerts page.
export default function Notifications() {
  const iconBg = {
    connection: 'bg-primary',
    mentorship: 'bg-success',
    job: 'bg-warning',
    event: 'bg-secondary',
  };

  const iconText = {
    connection: '🤝',
    mentorship: '🎓',
    job: '💼',
    event: '📅',
  };

  return (
    <div>
      <h3 className="mb-3">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="muted">You have no notifications.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="list-group-item d-flex align-items-start gap-3"
            >
              <div
                className={'avatar-circle avatar-sm ' + (iconBg[n.type] || 'bg-primary')}
                style={{ fontSize: '0.9rem' }}
              >
                <span>{iconText[n.type]}</span>
              </div>
              <div className="flex-grow-1">
                <div>{n.text}</div>
                <small className="muted">{n.date}</small>
              </div>
              <span className="badge bg-primary rounded-pill">New</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
