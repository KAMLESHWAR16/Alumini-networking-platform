import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  MessageSquare,
  Bell,
} from 'lucide-react';

// Bottom navigation on mobile. Points to the main user pages.
export default function BottomNav() {
  const links = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/alumni', label: 'Alumni', icon: Users },
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/events', label: 'Events', icon: CalendarDays },
    { to: '/messages', label: 'Chat', icon: MessageSquare },
    { to: '/notifications', label: 'Alerts', icon: Bell },
  ];

  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            'bn-link' + (isActive ? ' active' : '')
          }
        >
          <link.icon size={20} />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
