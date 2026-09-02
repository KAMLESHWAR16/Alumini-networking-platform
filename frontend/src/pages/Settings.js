import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Account settings page.
export default function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h3 className="mb-1">Settings</h3>
      <p className="muted mb-3">Manage your account preferences.</p>

      {saved && <div className="alert alert-success py-2">Settings saved!</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSave}>
            <h6 className="mb-3">Account Information</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h6 className="mb-3">Change Password</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="notify" defaultChecked />
              <label className="form-check-label" htmlFor="notify">
                Receive email notifications
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
