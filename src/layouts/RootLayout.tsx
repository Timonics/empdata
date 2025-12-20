import { Outlet } from "react-router";
import AdminWatcher from "@/components/auth-watchers/AdminWatcher";
import ClientWatcher from "@/components/auth-watchers/ClientWatcher";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <AdminWatcher />
      <ClientWatcher />
      <Outlet />
    </>
  );
};

export default RootLayout;