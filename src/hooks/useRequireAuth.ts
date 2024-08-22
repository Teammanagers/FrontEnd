import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};
