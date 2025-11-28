import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router";

export const ClientProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth("company");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/company/auth"} />;
};

export const ClientRedirectRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth("company");

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/company"} />;
};
