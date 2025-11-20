import React from "react";
import { Link } from "react-router";

import img from "@/assets/page-not-found.svg";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <img src={img} alt="Page not found" className="h-[300px]"/>
      <h1 className="text-4xl font-semibold">Page Not Found</h1>
      <Link
        to={"/admin"}
        className="p-4 px-5 rounded-lg bg-sky-500 w-fit text-white text-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
