import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router";

export const CompanyProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth("company");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/portal/auth/company"} />;
};

export const CompanyRedirectRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth("company");

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/portal/company"} />;
};
