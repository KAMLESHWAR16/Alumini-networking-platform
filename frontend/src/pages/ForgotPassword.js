import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Forgot password page - sends a reset link (demo only).
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="card-body p-4">
          <h4 className="text-center mb-1">Forgot Password?</h4>
          <p className="text-center muted mb-4">
            Enter your email and we will send you a reset link.
          </p>

          {sent ? (
            <>
              <div className="alert alert-success">
                If an account exists for {email}, a reset link has been sent.
              </div>
              <button className="btn btn-primary w-100" onClick={() => navigate('/login')}>
                Back to Login
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Reset Link
              </button>
              <p className="text-center mt-3 mb-0">
                <Link to="/login">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
