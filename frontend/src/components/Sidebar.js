import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Handshake,
  Briefcase,
  CalendarDays,
  MessageSquare,
  Bell,
  Settings,
} from 'lucide-react';

// Sidebar shown on desktop. Collapses to the bottom nav on mobile.
export default function Sidebar({ isAdmin }) {
  const userLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/alumni', label: 'Directory', icon: Users },
    { to: '/mentorship', label: 'Mentorship', icon: Handshake },
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/events', label: 'Events', icon: CalendarDays },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/notifications', label: 'Alerts', icon: Bell },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/alumni', label: 'Alumni', icon: Handshake },
    { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/admin/events', label: 'Events', icon: CalendarDays },
    { to: '/admin/mentorship', label: 'Mentorship', icon: Handshake },
    { to: '/admin/reports', label: 'Reports', icon: Bell },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      {!isAdmin && <div className="side-label">Main</div>}
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            'side-link' + (isActive ? ' active' : '')
          }
        >
          <link.icon size={18} />
          <span>{link.label}</span>
        </NavLink>
      ))}
      <div className="side-label">Account</div>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          'side-link' + (isActive ? ' active' : '')
        }
      >
        <Settings size={18} />
        <span>My Profile</span>
      </NavLink>
    </aside>
  );
}
