import React, { useState } from 'react';
import { users } from '../../data';

// Admin page to manage all users.
export default function ManageUsers() {
  const [userList, setUserList] = useState(users);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const verifyAlumni = (u) => {
    setUserList(
      userList.map((x) => (x.id === u.id ? { ...x, status: 'Verified' } : x))
    );
    setMessage(`${u.name} has been verified.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const removeUser = (u) => {
    setUserList(userList.filter((x) => x.id !== u.id));
    setMessage(`${u.name} has been removed.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const filtered = userList.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-1">Manage Users</h3>
      <p className="muted mb-3">All students and alumni on the platform.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 320 }}
      />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle avatar-sm">{u.name.charAt(0)}</div>
                    {u.name}
                  </div>
                </td>
                <td>
                  <span className="badge bg-info text-dark">{u.role}</span>
                </td>
                <td>
                  <span className={'badge ' + (u.status === 'Verified' || u.status === 'Active' ? 'bg-success' : 'bg-warning text-dark')}>
                    {u.status}
                  </span>
                </td>
                <td className="text-end">
                  {u.role === 'Alumni' && u.status !== 'Verified' && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => verifyAlumni(u)}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeUser(u)}
                  >
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
