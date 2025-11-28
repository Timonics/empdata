import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import ErrorPage from "./pages/error";
import Login from "./pages/admin/auth/login";
import AdminDashboardLayout from "./layouts/admin/DashboardLayout";
import Home from "./pages/admin/dashboard/home";
import Clients from "./pages/admin/dashboard/clients";
import CompanyLogin from "./pages/corporate-client/auth/login";
import CompanyDashboardLayout from "./layouts/company/DashboardLayout";
import AdminWatcher from "./components/auth-watchers/AdminWatcher";
import {
  ProtectedRoutes,
  RedirectRoutes,
} from "./components/protected-routes/AdminProtectedRoutes";
import ForgotPassword from "./pages/admin/auth/forgot-password";
import ResetPassword from "./pages/admin/auth/reset-password";
import { Toaster } from "./components/ui/sonner";
import EmailConfirmation from "./pages/admin/auth/forgot-password/EmailConfirmation";
import CompanyResetPassword from "./pages/corporate-client/auth/set-password";
import {
  ClientProtectedRoute,
  ClientRedirectRoutes,
} from "./components/protected-routes/ClientProtectedRoute";

function App() {
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

    // Corporate Client Routes
    {
      path: "/company/auth",
      element: <ClientRedirectRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <CompanyLogin />,
            },
            {
              path: "set-password",
              element: <CompanyResetPassword />,
            },
          ],
        },
      ],
    },

    {
      path: "/company",
      element: <ClientProtectedRoute />,
      children: [
        {
          path: "/company",
          element: <CompanyDashboardLayout />,
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
