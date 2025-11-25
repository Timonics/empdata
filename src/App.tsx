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

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },

    {
      path: "/company/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <CompanyLogin />,
        },
      ],
    },

    {
      path: "/admin",
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

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <AdminWatcher />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
