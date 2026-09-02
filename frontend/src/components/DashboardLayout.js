import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

// Wraps logged-in pages with the sidebar + main content + bottom nav.
export default function DashboardLayout({ children, isAdmin }) {
  return (
    <div className="dash-layout">
      <Sidebar isAdmin={isAdmin} />
      <div className="main-content">{children}</div>
      <BottomNav />
    </div>
  );
}
