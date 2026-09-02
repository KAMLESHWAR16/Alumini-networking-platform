import React from 'react';
import { reportData } from '../../data';

// Admin reports page with simple stats and charts (CSS bar charts).
export default function Reports() {
  const maxConnections = Math.max(
    ...reportData.requestsByMonth.map((r) => r.connections)
  );
  const maxMentorship = Math.max(
    ...reportData.requestsByMonth.map((r) => r.mentorship)
  );

  const totalUsers = reportData.usersByRole.reduce((s, r) => s + r.value, 0);

  return (
    <div>
      <h3 className="mb-1">Reports</h3>
      <p className="muted mb-3">Platform activity and analytics.</p>

      <div className="row g-4">
        {/* users by role */}
        <div className="col-lg-5">
          <div className="card h-100">
            <div className="card-header bg-white">Users by Role</div>
            <div className="card-body">
              {reportData.usersByRole.map((u) => (
                <div className="mb-3" key={u.role}>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{u.role}</span>
                    <span>{u.value}</span>
                  </div>
                  <div className="progress" style={{ height: 16 }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(u.value / totalUsers) * 100}%`,
                        backgroundColor: u.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              <p className="muted small mt-2 mb-0">
                Total users: {totalUsers}
              </p>
            </div>
          </div>
        </div>

        {/* requests by month */}
        <div className="col-lg-7">
          <div className="card h-100">
            <div className="card-header bg-white">
              Connections & Mentorship Requests (last 6 months)
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th style={{ width: '35%' }}>Connections</th>
                    <th style={{ width: '35%' }}>Mentorship</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.requestsByMonth.map((r) => (
                    <tr key={r.month}>
                      <td>{r.month}</td>
                      <td>
                        <div className="progress" style={{ height: 14 }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${(r.connections / maxConnections) * 100}%`,
                              backgroundColor: '#2563EB',
                            }}
                          ></div>
                        </div>
                        <small className="muted">{r.connections}</small>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 14 }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${(r.mentorship / maxMentorship) * 100}%`,
                              backgroundColor: '#7C3AED',
                            }}
                          ></div>
                        </div>
                        <small className="muted">{r.mentorship}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
