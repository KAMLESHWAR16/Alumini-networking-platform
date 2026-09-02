import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Shows and lets the user update their own profile.
// Works for both student and alumni roles.
export default function Profile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const roleName = user?.role === 'alumni' ? 'Alumni' : 'Student';

  return (
    <div className="container py-4">
      <h2 className="mb-1">My Profile</h2>
      <p className="text-muted">
        Manage your {roleName.toLowerCase()} profile details.
      </p>

      {saved && <div className="alert alert-success py-2">Profile saved!</div>}

      <div className="row">
        {/* basic info */}
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-3">Basic Information</h5>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user?.name || ''}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={user?.email || ''}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Headline / Role</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      roleName === 'Alumni'
                        ? 'e.g. Software Engineer at Google'
                        : 'e.g. Final year Computer Science student'
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" placeholder="City" />
                </div>
                <div className="mb-3">
                  <label className="form-label">About</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write a short introduction about yourself"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* education + skills */}
        <div className="col-lg-5">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="mb-3">Education</h5>
              <div className="mb-3">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">College</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Our College"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Passing Year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 2025"
                />
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-3">Skills</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a skill and press Add"
                />
              </div>
              <div className="skills-tags mb-3">
                {['Java', 'React', 'MySQL'].map((s, i) => (
                  <span className="skill-tag" key={i}>
                    {s}
                  </span>
                ))}
              </div>
              <button className="btn btn-outline-primary btn-sm">Add Skill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
