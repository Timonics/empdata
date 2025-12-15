import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { loading, forgotPassword } = useAuth("admin");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async () => {
    try {
      await forgotPassword(email).unwrap();
      navigate("../forgot-password/confirm-email");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Forgot Password</h2>
        {/* <p className="text-sm md:text-base font-light text-black/70">
          Secure login access for administrators.
        </p> */}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <input
          value={email}
          placeholder="Email"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
          onChange={handleChange}
        />
      </div>

      <button
        className="text-lg px-6 py-2 rounded-md bg-black font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        onClick={handleSubmit}
      >
        {loading ? (
          <LoaderCircle className="animate-spin size-8" />
        ) : (
          "Reset Password"
        )}
      </button>

      <div className="ml-auto">
        <p>
          Back to{" "}
          <span className="text-sky-400 underline">
            <Link to={"../"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
