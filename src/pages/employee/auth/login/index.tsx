import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { LoginData } from "@/interfaces/auth.interface";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const EmployeeLogin: React.FC = () => {
  const { login, loading } = useAuth("employee");
  const { logout } = useAuth("company");

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

  const handleLogin = async () => {
    try {
      const result = await login(loginData).unwrap();
      console.log(result);

      if (result.data.user.role !== "employee") {
        toast.error("Login attempt by a non employee");
        logout();
      } else {
        toast.success(result.message || "Login successful");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Employee Login</h2>
        <p className="text-sm md:text-base font-light text-black/70">
          Secure login access for employees.
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
      <Button
        size={"xl"}
        className="w-full text-xl font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        onClick={handleLogin}
      >
        {loading ? <LoaderCircle className="animate-spin size-8" /> : "Log in"}
      </Button>
    </div>
  );
};

export default EmployeeLogin;
