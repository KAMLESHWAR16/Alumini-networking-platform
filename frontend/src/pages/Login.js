import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // backend not ready, so demo login works with any input,
    // and role is guessed from the email prefix.
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    let role = 'student';
    let name = 'Student User';
    if (email.toLowerCase().includes('admin')) {
      role = 'admin';
      name = 'Admin User';
    } else if (email.toLowerCase().includes('alumni')) {
      role = 'alumni';
      name = 'Alumni User';
    }

    login({ name, email, role });
    navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card shadow">
        <div className="card-body p-4">
          <h4 className="text-center mb-1">Welcome back</h4>
          <p className="text-center text-muted mb-4">Login to continue</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
