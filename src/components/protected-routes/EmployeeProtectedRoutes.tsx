import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router";

export const EmployeeProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth("employee");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/portal/auth/employee"} />;
};

export const EmployeeRedirectRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth("employee");

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/portal/employee"} />;
};
