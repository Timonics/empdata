import { logoutAdmin } from "@/store/slices/admin_auth.slice";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminWatcher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { expiresAt, isAuthenticated } = useSelector(
    (state: RootState) => state.adminAuth
  );

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return;

    const now = Date.now();
    const timeLeft = expiresAt - now;

    if (timeLeft <= 0) {
      dispatch(logoutAdmin());
      toast.info("Login Session has expired");
    }

    const timer = setTimeout(() => {
      dispatch(logoutAdmin());
      toast.info("Login Session has expired");
    }, timeLeft);
    return () => clearTimeout(timer);
  }, [expiresAt, isAuthenticated]);

  return null;
};

export default AdminWatcher;
