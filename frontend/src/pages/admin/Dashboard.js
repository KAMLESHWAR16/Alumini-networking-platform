import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, CalendarDays, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminActivity } from '../../data';

// Admin landing dashboard with quick stats and recent activity.
export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Students', value: 450, icon: Users, color: '#2563EB' },
    { label: 'Alumni', value: 280, icon: GraduationCap, color: '#7C3AED' },
    { label: 'Events', value: 12, icon: CalendarDays, color: '#F59E0B' },
    { label: 'Jobs', value: 34, icon: Briefcase, color: '#16A34A' },
  ];

  return (
    <div>
      <h3 className="mb-1">Admin Dashboard</h3>
      <p className="muted mb-3">Welcome back, {user?.name}.</p>

      {/* stats */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="avatar-circle" style={{ backgroundColor: s.color }}>
                  <s.icon size={20} />
                </div>
                <div>
                  <h4 className="mb-0">{s.value}</h4>
                  <small className="muted">{s.label}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* recent activity */}
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header bg-white">Recent Activities</div>
            <ul className="list-group list-group-flush">
              {adminActivity.map((a) => (
                <li
                  key={a.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <span>{a.text}</span>
                  <small className="muted">{a.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* quick actions */}
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header bg-white">Quick Actions</div>
            <div className="card-body">
              <Link to="/admin/users" className="btn btn-outline-primary w-100 mb-2">
                Manage Users
              </Link>
              <Link to="/admin/alumni" className="btn btn-outline-secondary w-100 mb-2">
                Verify Alumni
              </Link>
              <Link to="/admin/events" className="btn btn-outline-secondary w-100 mb-2">
                Manage Events
              </Link>
              <Link to="/admin/reports" className="btn btn-outline-secondary w-100">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
