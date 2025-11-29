import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import ErrorPage from "./pages/error";
import Login from "./pages/admin/auth/login";
import AdminDashboardLayout from "./layouts/admin/DashboardLayout";
import Home from "./pages/admin/dashboard/home";
import Clients from "./pages/admin/dashboard/clients";
import CompanyLogin from "./pages/corporate-client/auth/login";
import DashboardLayout from "./layouts/client/DashboardLayout";
import AdminWatcher from "./components/auth-watchers/AdminWatcher";
import {
  ProtectedRoutes,
  RedirectRoutes,
} from "./components/protected-routes/AdminProtectedRoutes";
import ForgotPassword from "./pages/admin/auth/forgot-password";
import ResetPassword from "./pages/admin/auth/reset-password";
import { Toaster } from "./components/ui/sonner";
import EmailConfirmation from "./pages/admin/auth/forgot-password/EmailConfirmation";
import ClientResetPassword from "./components/set-password";
import {
  CompanyRedirectRoutes,
  CompanyProtectedRoute,
} from "./components/protected-routes/CompanyProtectedRoute";
import { setStore } from "./utils/axios";
import { store } from "./store/store";
import EmployeeLogin from "./pages/employee/auth/login";
import PortalAuthRedirect from "./components/portal-auth";
import {
  EmployeeProtectedRoute,
  EmployeeRedirectRoutes,
} from "./components/protected-routes/EmployeeProtectedRoutes";

function App() {
  setStore(store);
  const router = createBrowserRouter([
    //Admin Routes
    {
      path: "/admin/auth",
      element: <RedirectRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "forgot-password/confirm-email",
              element: <EmailConfirmation />,
            },
            {
              path: "reset-password",
              element: <ResetPassword />,
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <AdminDashboardLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "company",
              element: <Clients />,
            },
          ],
        },
      ],
    },

    // Client Routes
    {
      path: "/portal/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <PortalAuthRedirect />,
        },
        {
          path: "company",
          element: <CompanyRedirectRoutes />,
          children: [
            {
              path: "",
              element: <CompanyLogin />,
            },
          ],
        },

        {
          path: "employee",
          element: <EmployeeRedirectRoutes />,
          children: [
            {
              path: "",
              element: <EmployeeLogin />,
            },
          ],
        },
        {
          path: "set-password",
          element: <ClientResetPassword />,
        },
      ],
    },

    {
      path: "/portal",
      element: <DashboardLayout />,
      children: [
        {
          path: "company",
          element: <CompanyProtectedRoute />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
        {
          path: "employee",
          element: <EmployeeProtectedRoute />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },

    // Catch-all route for undefined paths
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <Toaster />
      <AdminWatcher />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
