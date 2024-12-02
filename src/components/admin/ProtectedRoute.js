import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../services/authService";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />; // Redirige al login si no está autenticado
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; // Redirige si no tiene el rol adecuado
  }

  return <Outlet />; // Renderiza la ruta protegida
};

export default ProtectedRoute;
