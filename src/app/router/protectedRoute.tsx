import { Navigate, Outlet } from 'react-router-dom';

const isAuth = true;

export const ProtectedRoute = () => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
