import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRoleNavigation(role: 'hr' | 'student') {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    // Only redirect if we're on the wrong dashboard type
    if (role === 'hr') {
      // For HR role, only redirect if we're explicitly on a student path
      if (path.startsWith('/student') || path === '/student-dashboard') {
        navigate('/hr-dashboard');
      }
    } else {
      // For student role, only redirect if we're explicitly on an HR path
      if (path.startsWith('/hr') || path === '/hr-dashboard') {
        navigate('/student-dashboard');
      }
    }
  }, [location.pathname, role, navigate]);
}