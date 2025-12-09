import { useAuth } from "@/hooks/useAuth";
import type { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router";

export const EmployeeProtectedRoute: React.FC = () => {
  const { clientsAuthData } = useSelector(
    (state: RootState) => state.clientsAuth
  );
  const { isAuthenticated } = useAuth("employee");

  return isAuthenticated && clientsAuthData?.role === "employee" ? (
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
  const { clientsAuthData } = useSelector(
    (state: RootState) => state.clientsAuth
  );
  const { isAuthenticated, isVerified } = useAuth("employee");
  const location = useLocation();

  if (location.pathname === "/portal/auth/employee/validation") {
    return isAuthenticated &&
      !isVerified &&
      clientsAuthData?.role === "employee" ? (
      <Outlet />
    ) : !isAuthenticated ? (
      <Navigate to="/portal/auth/employee" />
    ) : (
      <Navigate to="/portal/employee" />
    );
  }

  return !isAuthenticated && clientsAuthData?.role === "employee" ? (
    <Outlet />
  ) : isVerified ? (
    <Navigate to="/portal/employee" />
  ) : (
    <Navigate to="/portal/auth/employee/validation" />
  );
};
