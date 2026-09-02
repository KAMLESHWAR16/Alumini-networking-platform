import React, { useState } from 'react';
import { events } from '../../data';

// Admin page to manage events.
export default function ManageEvents() {
  const [list, setList] = useState(events);
  const [message, setMessage] = useState('');

  const remove = (ev) => {
    setList(list.filter((x) => x.id !== ev.id));
    setMessage(`${ev.name} has been removed.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Manage Events</h3>
      <p className="muted mb-3">Approve and manage all alumni events.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Organizer</th>
              <th>Registrations</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.name}</td>
                <td>{ev.date}</td>
                <td>{ev.organizer}</td>
                <td>
                  {ev.registered}/{ev.capacity}
                </td>
                <td className="text-end">
                  <button className="btn btn-danger btn-sm" onClick={() => remove(ev)}>
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
