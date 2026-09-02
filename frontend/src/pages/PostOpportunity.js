import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Alumni page to post a new opportunity.
export default function PostOpportunity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    description: '',
    deadline: '',
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate('/jobs'), 2000);
  };

  return (
    <div>
      <Link to="/jobs" className="small muted d-inline-flex align-items-center gap-1 mb-3">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>

      <h3 className="mb-3">Post an Opportunity</h3>

      {done && (
        <div className="alert alert-success py-2">Opportunity posted! Redirecting...</div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Job Title *</label>
                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Company *</label>
                <input
                  className="form-control"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location *</label>
                <input
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Job Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Part Time</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Application Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Required Skills</label>
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

              <div className="col-12">
                <label className="form-label">Job Description *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">
                  Post Opportunity
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
