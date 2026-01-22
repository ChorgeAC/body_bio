import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { JSX } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    switch (role) {
      case 'Admin':
        return <Navigate to="/admin-portal" replace />;
      case 'Doctor':
        return <Navigate to="/doctor-portal" replace />;
      case 'User':
        return <Navigate to="/user-portal" replace />;
      default:
        return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
