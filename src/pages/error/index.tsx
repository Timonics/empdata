import type { RootState } from "@/store/store";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const { authData } = useSelector((state: RootState) => state.adminAuth);
  const { clientsAuthData } = useSelector(
    (state: RootState) => state.clientsAuth
  );
  useEffect(() => {
    if (authData && !clientsAuthData) {
      navigate("/admin/auth");
    }

    if (clientsAuthData && clientsAuthData.role === "company_admin") {
      navigate("/portal/auth");
    }

    if (clientsAuthData && clientsAuthData.role === "employee") {
      navigate("/portal/auth/employee");
    }

    if (!authData && !clientsAuthData) {
      navigate("/admin/auth");
    }
  }, [authData, clientsAuthData]);

  return (
    <div className="min-h-screen flex items-center justify-center gap-5 italic text-3xl">
      <LoaderCircle size={30} className="animate-spin" />
      Redirecting...
    </div>
  );
};

export default ErrorPage;
