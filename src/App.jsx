import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import './App.css';

/**
 * ProtectedRoute — guards dashboard routes by authentication & role.
 * Redirects unauthenticated or wrong-role users back to "/".
 */
function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // If the user is authenticated but has the wrong role, send them
    // to their own dashboard instead of the landing page.
    const redirectPath = user.role === 'lawyer' ? '/lawyer' : '/user';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

/**
 * App — root component rendering application routes.
 */
export default function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* User Dashboard — requires "user" role */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Lawyer Dashboard — requires "lawyer" role */}
        <Route
          path="/lawyer"
          element={
            <ProtectedRoute role="lawyer">
              <LawyerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Aliases */}
        <Route path="/dashboard" element={<Navigate to="/user" replace />} />
        <Route path="/user/dashboard" element={<Navigate to="/user" replace />} />
        <Route path="/lawyer/dashboard" element={<Navigate to="/lawyer" replace />} />

        {/* Catch-all → landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

