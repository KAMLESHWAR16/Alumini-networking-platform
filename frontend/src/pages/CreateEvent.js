import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Create a new alumni event (admin or alumni).
export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    venue: '',
    type: 'Offline',
    about: '',
    capacity: '',
  });
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate('/events'), 2000);
  };

  return (
    <div>
      <Link to="/events" className="small muted d-inline-flex align-items-center gap-1 mb-3">
        <ArrowLeft size={14} /> Back to Events
      </Link>

      <h3 className="mb-3">Create an Event</h3>

      {done && (
        <div className="alert alert-success py-2">Event created! Redirecting...</div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Event Name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Offline</option>
                  <option>Online</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Venue / Link *</label>
                <input
                  className="form-control"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  placeholder="e.g. Auditorium or Google Meet link"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">About the Event *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">
                  Create Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
