import React from "react";
import { Outlet } from "react-router";
import Logo from "@/components/logo";

const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center p-4 relative bg-linear-to-br from-sky-200 to-white">
      <div className="absolute border max-w-2xl w-full h-[500px] p-4 bg-sky-100 blur-3xl -z-10"/>
      <div className="bg-gray-50 py-6 px-5 space-y-4 rounded-lg max-w-3xl w-full shadow-2xl">
        <Logo />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
