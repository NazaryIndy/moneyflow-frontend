import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuth } from '@/features/auth/model/authStore/hooks.ts';

export const ProtectedRoute = () => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
