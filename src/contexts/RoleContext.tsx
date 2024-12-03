import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Role = 'hr' | 'student' | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/pricing', '/contact-sales', '/schedule-demo'];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as Role) || null;
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = role !== null;

  // Handle role changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [role]);

  // Handle authentication redirects
  useEffect(() => {
    const currentPath = location.pathname;
    if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
      const returnUrl = currentPath !== '/login' ? currentPath : undefined;
      navigate('/login', { state: { returnUrl } });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Logout handler
  const logout = useCallback(() => {
    setRole(null);
    localStorage.removeItem('userRole');
    navigate('/login');
  }, [navigate]);

  const contextValue = {
    role,
    setRole,
    isAuthenticated,
    logout
  };

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}