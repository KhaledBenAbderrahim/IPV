import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: 'hr' | 'student';
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { role: userRole, isAuthenticated } = useRole();

  // If no role is required, allow public access
  if (!role) {
    return <>{children}</>;
  }

  // For protected routes, check authentication and role
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to={`/${userRole}-dashboard`} />;
  }

  return <>{children}</>;
}