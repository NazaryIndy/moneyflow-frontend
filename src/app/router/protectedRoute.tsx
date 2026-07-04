import { Navigate, Outlet } from "react-router-dom";

const isAuth = false; // позже заменишь на store / token

export const ProtectedRoute = () => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};