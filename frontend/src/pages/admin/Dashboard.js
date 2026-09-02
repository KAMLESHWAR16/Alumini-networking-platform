import React from 'react';
import { useAuth } from '../../context/AuthContext';

// Admin landing dashboard with quick stats and recent activity.
export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: 120 },
    { label: 'Students', value: 85 },
    { label: 'Alumni', value: 30 },
    { label: 'Pending Verification', value: 5 },
  ];

  const recentActivity = [
    { id: 1, text: 'Priya Sharma accepted a connection request', time: '2 hours ago' },
    { id: 2, text: 'New event created: Tech Talk AI in Industry', time: '5 hours ago' },
    { id: 3, text: 'Divya Menon registered as alumni', time: '1 day ago' },
    { id: 4, text: 'Ravi Kumar applied for Software Engineer Intern', time: '2 days ago' },
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-1">Admin Dashboard</h2>
      <p className="text-muted">Welcome back, {user?.name}.</p>

      {/* stats cards */}
      <div className="row mb-4">
        {stats.map((s, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h3 className="text-primary mb-1">{s.value}</h3>
                <span className="text-muted">{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* recent activity */}
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">Recent Activity</div>
            <ul className="list-group list-group-flush">
              {recentActivity.map((a) => (
                <li
                  key={a.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <span>{a.text}</span>
                  <small className="text-muted">{a.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* quick links */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header bg-white">Quick Actions</div>
            <div className="card-body">
              <a href="#/admin/users" className="btn btn-outline-primary w-100 mb-2">
                Manage Users
              </a>
              <button className="btn btn-outline-secondary w-100 mb-2">
                Verify Alumni
              </button>
              <button className="btn btn-outline-secondary w-100 mb-2">
                Manage Events
              </button>
              <button className="btn btn-outline-secondary w-100">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
