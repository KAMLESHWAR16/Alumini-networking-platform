import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sticky top navigation bar shown on every page.
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const avatarLetter = user ? user.name.charAt(0) : '?';

  return (
    <nav className="topbar">
      <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
        <Link className="brand-name" to="/">
          Alumni<span>Connect</span>
        </Link>

        {user && (
          <div className="d-none d-md-flex align-items-center search-box">
            <Search size={16} className="me-2 muted" />
            <input
              type="text"
              className="form-control form-control-sm border-0"
              placeholder="Search alumni..."
              style={{ width: 260, background: 'transparent' }}
            />
          </div>
        )}

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <NavLink to="/notifications" className="muted">
                <Bell size={20} />
              </NavLink>
              <NavLink to="/profile" className="muted">
                <div className="avatar-circle avatar-sm">{avatarLetter}</div>
              </NavLink>
              <button
                className="btn btn-outline-secondary btn-sm d-none d-sm-inline"
                onClick={handleLogout}
              >
                <LogOut size={14} className="me-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="muted">
                Login
              </NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
