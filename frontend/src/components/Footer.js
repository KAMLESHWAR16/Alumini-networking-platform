import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.
        </p>
        <small className="muted">
          Connecting students and alumni of our college.
        </small>
      </div>
    </footer>
  );
}
