import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="font-mono text-xs tracking-widest uppercase text-[#555]">
          Loading session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login/${requiredRole}`} />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};
