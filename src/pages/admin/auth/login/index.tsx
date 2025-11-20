import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Administrator Login</h2>
        <p className="text-sm md:text-base font-light text-black/70">
          Secure login access for administrators.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <input
          placeholder="Email"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
        />
        <input
          placeholder="Password"
          type="password"
          className="p-4 rounded-xl w-full bg-black/10"
        />
      </div>
      <Link to={"/admin"} className="w-full">
        <Button
          size={"xl"}
          className="w-full text-xl font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        >
          Log in
        </Button>
      </Link>
    </div>
  );
};

export default Login;
