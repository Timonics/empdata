import { logoutClients } from "@/store/slices/clients_auth.slice";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "sonner";

const ClientWatcher: React.FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { expiresAt, isAuthenticated } = useSelector(
    (state: RootState) => state.clientsAuth
  );

  const suppressedRoutes = ["/onboarding"];

  const shouldSuppress = suppressedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return;

    const now = Date.now();
    const timeLeft = expiresAt - now;

    if (timeLeft <= 0) {
      dispatch(logoutClients());
      toast.info("Login Session has expired");
    }

    const timer = setTimeout(() => {
      dispatch(logoutClients());
      !shouldSuppress && toast.info("Login Session has expired");
    }, timeLeft);
    return () => clearTimeout(timer);
  }, [expiresAt, isAuthenticated]);

  return null;
};

export default ClientWatcher;
