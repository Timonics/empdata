import React, { useState } from "react";
import { Link } from "react-router";

const PortalAuthRedirect: React.FC = () => {
  const [loginType, setSelectedLoginType] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl text-black/70 text-center">
        Choose the portal to login to
      </h2>
      <div className="flex flex-col md:flex-row w-full gap-2 items-center">
        <button
          onClick={() => {
            setSelectedLoginType("company");
          }}
          className={`${
            loginType === "company"
              ? "bg-sky-100 font-semibold border-none"
              : ""
          } border hover:bg-sky-100 text-lg font-medium border-muted-foreground w-full p-4 rounded-xl text-center`}
        >
          Company
        </button>
        <button
          onClick={() => {
            setSelectedLoginType("employee");
          }}
          className={`${
            loginType === "employee"
              ? "bg-sky-100 font-semibold border-none"
              : ""
          } border hover:bg-sky-100 text-lg font-medium border-muted-foreground w-full p-4 rounded-xl text-center`}
        >
          Employee
        </button>
      </div>

      <Link
        to={`${loginType}`}
        className="p-4 bg-black rounded-xl text-white text-center text-lg hover:bg-blue-300 hover:text-black"
      >
        Next
      </Link>
    </div>
  );
};

export default PortalAuthRedirect;
