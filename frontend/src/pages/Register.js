import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Briefcase, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { departments, careerInterests } from '../data';

// Two step registration: pick a role, then fill the profile.
export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: departments[0],
    batch: '',
    // alumni only
    company: '',
    jobRole: '',
    experience: '',
    industry: careerInterests[0],
    linkedin: '',
    mentorshipAvailable: true,
  });
  const [skills, setSkills] = useState(['Java']);
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const chooseRole = (r) => {
    setRole(r);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    // fake registration for now, backend will replace this later
    login({ name: form.name, email: form.email, role });
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="card-body p-4">
          {step === 1 ? (
            <>
              <h4 className="text-center mb-1">Join AlumniConnect</h4>
              <p className="text-center muted mb-4">How do you want to join?</p>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div
                    className={'role-pick ' + (role === 'student' ? 'selected' : '')}
                    onClick={() => chooseRole('student')}
                  >
                    <GraduationCap size={32} className="text-primary mb-2" />
                    <h6 className="mb-1">Student</h6>
                    <small className="muted">Current Student</small>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className={'role-pick ' + (role === 'alumni' ? 'selected' : '')}
                    onClick={() => chooseRole('alumni')}
                  >
                    <Briefcase size={32} className="text-primary mb-2" />
                    <h6 className="mb-1">Alumni</h6>
                    <small className="muted">Graduate / Professional</small>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={!role}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center gap-2 mb-3">
                <button
                  className="btn btn-link p-0 muted"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={18} />
                </button>
                <h5 className="mb-0">Complete Your Profile</h5>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Set a password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Batch (Passing Year)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="batch"
                      value={form.batch}
                      onChange={handleChange}
                      placeholder="e.g. 2026"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Skills</label>
                  <div className="d-flex gap-2">
                    <input
                      className="form-control"
                      placeholder="Add a skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-primary" onClick={addSkill}>
                      + Add
                    </button>
                  </div>
                  <div className="skills-tags mt-2">
                    {skills.map((s, i) => (
                      <span className="skill-tag" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {role === 'alumni' && (
                  <div className="border-top pt-3 mt-3">
                    <h6 className="mb-3">Professional Details</h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Current Company</label>
                        <input
                          className="form-control"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="e.g. Google"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Job Role</label>
                        <input
                          className="form-control"
                          name="jobRole"
                          value={form.jobRole}
                          onChange={handleChange}
                          placeholder="e.g. Software Engineer"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Years of Experience</label>
                        <input
                          type="number"
                          className="form-control"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          placeholder="e.g. 5"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Industry</label>
                        <select
                          className="form-select"
                          name="industry"
                          value={form.industry}
                          onChange={handleChange}
                        >
                          {careerInterests.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">LinkedIn Profile</label>
                        <input
                          className="form-control"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={handleChange}
                          placeholder="@yourhandle"
                        />
                      </div>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="mentorAvail"
                        checked={form.mentorshipAvailable}
                        onChange={(e) =>
                          setForm({ ...form, mentorshipAvailable: e.target.checked })
                        }
                      />
                      <label className="form-check-label" htmlFor="mentorAvail">
                        I am available for mentorship
                      </label>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Save Profile
                </button>
              </form>
            </>
          )}

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
