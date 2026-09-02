import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AlumniDirectory from './pages/AlumniDirectory';
import AlumniProfile from './pages/AlumniProfile';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import PostOpportunity from './pages/PostOpportunity';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Connections from './pages/Connections';
import Mentorship from './pages/Mentorship';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAlumni from './pages/admin/ManageAlumni';
import ManageJobs from './pages/admin/ManageJobs';
import ManageEvents from './pages/admin/ManageEvents';
import ManageMentorship from './pages/admin/ManageMentorship';
import Reports from './pages/admin/Reports';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 d-flex flex-column">
        <Routes>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* user pages (logged in) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AlumniDirectory />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AlumniProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Jobs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <JobDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/post"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PostOpportunity />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Events />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EventDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateEvent />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Connections />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentorship"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Mentorship />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Messages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* admin pages */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <ManageUsers />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/alumni"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <ManageAlumni />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <ManageJobs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <ManageEvents />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mentorship"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <ManageMentorship />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout isAdmin>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
