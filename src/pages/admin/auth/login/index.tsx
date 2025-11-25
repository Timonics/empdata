import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { LoginData } from "@/interfaces/auth.interface";
import React, { useState, type ChangeEvent } from "react";
import { Link } from "react-router";

const Login: React.FC = () => {
  const { login, loading } = useAuth("admin");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    login(loginData);
  };

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
          name="email"
          value={loginData.email}
          placeholder="Email"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
        <input
          name="password"
          value={loginData.password}
          placeholder="Password"
          type="password"
          className="p-4 rounded-xl w-full bg-black/10"
          onChange={handleChange}
        />
      </div>
      <Link to={"/admin"} className="w-full" onClick={handleLogin}>
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
