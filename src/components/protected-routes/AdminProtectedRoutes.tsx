import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth("admin");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/admin/auth"} />;
};

export const RedirectRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth("admin");

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/admin"} />;
};
