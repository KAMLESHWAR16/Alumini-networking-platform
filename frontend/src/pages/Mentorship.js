import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { helpOptions, careerInterests, alumni, mentorshipRequests } from '../data';
import { useAuth } from '../context/AuthContext';

// Mentorship page with three views: Find Mentor, My Requests, My Mentors.
export default function Mentorship() {
  const { user } = useAuth();
  const isAlumni = user && user.role === 'alumni';
  const [tab, setTab] = useState(isAlumni ? 'requests' : 'find');
  const [needs, setNeeds] = useState(['Career Advice']);
  const [interest, setInterest] = useState(careerInterests[0]);
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState(mentorshipRequests);

  // match score just for demo
  const computeScore = (a) => {
    let score = 70;
    if (a.verified) score += 10;
    if (a.mentorshipAvailable) score += 5;
    if (needs.includes('Resume Review') || needs.includes('Interview Preparation')) score += 5;
    return Math.min(96, score + (a.experience > 5 ? 4 : 0));
  };

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleNeed = (opt) => {
    if (needs.includes(opt)) {
      setNeeds(needs.filter((n) => n !== opt));
    } else {
      setNeeds([...needs, opt]);
    }
  };

  const handleStatus = (req, status) => {
    setRequests(requests.map((r) => (r.id === req.id ? { ...r, status } : r)));
    notify(`Request from ${req.from} marked as ${status}`);
  };

  return (
    <div>
      <h3 className="mb-1">Mentorship</h3>
      <p className="muted mb-3">
        {isAlumni
          ? 'Manage requests from students who want your guidance.'
          : 'Find seniors who can guide you in your career.'}
      </p>

      {message && <div className="alert alert-success py-2">{message}</div>}

      {/* tabs */}
      <ul className="nav nav-pills mb-4">
        {isAlumni ? (
          <li className="nav-item">
            <button
              className={'nav-link ' + (tab === 'requests' ? 'active' : '')}
              onClick={() => setTab('requests')}
            >
              My Requests
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <button
                className={'nav-link ' + (tab === 'find' ? 'active' : '')}
                onClick={() => setTab('find')}
              >
                Find a Mentor
              </button>
            </li>
            <li className="nav-item">
              <button
                className={'nav-link ' + (tab === 'requests' ? 'active' : '')}
                onClick={() => setTab('requests')}
              >
                My Requests
              </button>
            </li>
            <li className="nav-item">
              <button
                className={'nav-link ' + (tab === 'mentors' ? 'active' : '')}
                onClick={() => setTab('mentors')}
              >
                My Mentors
              </button>
            </li>
          </>
        )}
      </ul>

      {tab === 'find' && (
        <div className="row g-4">
          {/* preferences */}
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">What do you need help with?</h6>
                {helpOptions.map((opt) => (
                  <div className="form-check mb-2" key={opt}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={opt}
                      checked={needs.includes(opt)}
                      onChange={() => toggleNeed(opt)}
                    />
                    <label className="form-check-label" htmlFor={opt}>
                      {opt}
                    </label>
                  </div>
                ))}

                <label className="form-label mt-3">Your Career Interest</label>
                <select
                  className="form-select"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  {careerInterests.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button className="btn btn-primary w-100 mt-3">Find Mentors</button>
              </div>
            </div>
          </div>

          {/* recommended */}
          <div className="col-lg-7">
            <h6 className="mb-3">Recommended Mentors</h6>
            {alumni
              .filter((a) => a.mentorshipAvailable)
              .slice(0, 3)
              .map((a) => {
                const score = computeScore(a);
                return (
                  <div className="card mb-3" key={a.id}>
                    <div className="card-body d-flex flex-wrap align-items-center gap-3">
                      <div className="avatar-circle">{a.name.charAt(0)}</div>
                      <div className="flex-grow-1">
                        <strong>{a.name}</strong>
                        <div className="muted small">
                          {a.role} at {a.company}
                        </div>
                        <div className="muted small mt-1">
                          Skills: {a.skills.join(', ')}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="score-ring" style={{ '--score': score }}>
                          <span>{score}%</span>
                        </div>
                        <small className="muted">Match</small>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <Link to={`/alumni/${a.id}`} className="btn btn-outline-primary btn-sm">
                          View Profile
                        </Link>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => notify(`Mentorship request sent to ${a.name}`)}
                        >
                          Request Help
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {tab === 'requests' && (
        <div className="card">
          <div className="card-header bg-white">Mentorship Requests</div>
          <ul className="list-group list-group-flush">
            {requests.length === 0 ? (
              <li className="list-group-item muted">No mentorship requests yet.</li>
            ) : (
              requests.map((req) => (
                <li
                  key={req.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{req.from}</strong>
                    <span className="muted small ms-2">{req.fromRole}</span>
                  </div>
                  {req.status === 'Pending' ? (
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-success"
                        onClick={() => handleStatus(req, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleStatus(req, 'Declined')}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span
                      className={
                        req.status === 'Accepted'
                          ? 'badge bg-success'
                          : 'badge bg-secondary'
                      }
                    >
                      {req.status}
                    </span>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {tab === 'mentors' && (
        <div className="card">
          <div className="card-header bg-white">My Mentors</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-center gap-3">
              <div className="avatar-circle">R</div>
              <div>
                <strong>Rahul Verma</strong>
                <div className="muted small">Frontend Developer at Flipkart</div>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center gap-3">
              <div className="avatar-circle" style={{ backgroundColor: '#7C3AED' }}>
                P
              </div>
              <div>
                <strong>Priya Sharma</strong>
                <div className="muted small">Data Scientist at Microsoft</div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
