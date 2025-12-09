import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";

export const EmployeeProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth("employee");

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/portal/auth/employee"} />
  );
};

// export const EmployeeRedirectRoutes: React.FC = () => {
//   const { isAuthenticated } = useAuth("employee");

//   return !isAuthenticated ? (
//     <Outlet />
//   ) : (
//     <Navigate to={"/portal/employee"} />
//   );
// };

export const EmployeeRedirectRoutes: React.FC = () => {
  const { isAuthenticated, isVerified } = useAuth("employee");
  const location = useLocation();

  if (location.pathname === "/portal/auth/employee/validation") {
    return isAuthenticated && !isVerified ? (
      <Outlet />
    ) : !isAuthenticated ? (
      <Navigate to="/portal/auth/employee" />
    ) : (
      <Navigate to="/portal/employee" />
    );
  }

  return !isAuthenticated ? (
    <Outlet />
  ) : isVerified ? (
    <Navigate to="/portal/employee" />
  ) : (
    <Navigate to="/portal/auth/employee/validation" />
  );
};
