import React, { useState } from 'react';
import { users } from '../../data';

// Admin page to manage all users and verify alumni.
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
    <div className="container py-4">
      <h2 className="mb-1">Manage Users</h2>
      <p className="text-muted">Verify alumni and manage all platform users.</p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="row mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
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
                <td>{u.name}</td>
                <td>
                  <span className="badge bg-info text-dark">{u.role}</span>
                </td>
                <td>
                  {u.role === 'Alumni' && u.status !== 'Verified' ? (
                    <span className="badge bg-warning text-dark">{u.status}</span>
                  ) : (
                    <span className="badge bg-success">{u.status}</span>
                  )}
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
