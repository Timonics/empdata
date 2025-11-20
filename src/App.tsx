import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./layouts/admin/AuthLayout";
import ErrorPage from "./pages/error";
import Login from "./pages/admin/auth/login";
import DashboardLayout from "./layouts/admin/DashboardLayout";
import DashboardHome from "./pages/admin/dashboard/home";
import Clients from "./pages/admin/dashboard/clients";

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
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <DashboardHome />,
        },
        {
          path: "clients",
          element: <Clients />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
