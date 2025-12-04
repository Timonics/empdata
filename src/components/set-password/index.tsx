import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { IResetPassword } from "@/interfaces/auth.interface";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import RedirectOnPasswordSet from "./RedirectOnPasswordSet";

const ClientResetPassword: React.FC = () => {
  const [redirect, setRedirect] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<
    "employee" | "company" | null
  >(null);
  const { loading, resetPassword } = useAuth(selectedUserType);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const reset_token = queryParams.get("token");
  const user_email = queryParams.get("email");

  const [passwordDetails, setPasswordDetails] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (passwordDetails.new_password !== passwordDetails.confirm_new_password)
      return;

    if (!reset_token || !user_email) {
      return;
    }

    const resetData: IResetPassword = {
      token: reset_token,
      email: user_email,
      password: passwordDetails.new_password,
      password_confirmation: passwordDetails.confirm_new_password,
    };

    try {
      const result = await resetPassword(resetData).unwrap();
      setRedirect(true);
      toast.success(result.message || "Password has been set successfully.");
      setTimeout(() => {
        setRedirect(false);
        navigate(
          selectedUserType === "company"
            ? "/portal/auth"
            : `/portal/auth/${selectedUserType}`
        );
      }, 3000);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Set Password</h2>
        <p className="text-sm md:text-base font-light text-black/70">
          Set your password to access portal.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-lg">Select Client Type:</label>
        <div className="flex flex-col md:flex-row w-full gap-2 items-center">
          <button
            onClick={() => {
              setSelectedUserType("company");
            }}
            className={`${
              selectedUserType === "company"
                ? "bg-sky-100 font-semibold border-none"
                : ""
            } border hover:bg-sky-100 text-lg font-medium border-muted-foreground w-full p-4 rounded-xl text-center`}
          >
            Company
          </button>
          <button
            onClick={() => {
              setSelectedUserType("employee");
            }}
            className={`${
              selectedUserType === "employee"
                ? "bg-sky-100 font-semibold border-none"
                : ""
            } border hover:bg-sky-100 text-lg font-medium border-muted-foreground w-full p-4 rounded-xl text-center`}
          >
            Employee
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <input
          name="new_password"
          value={passwordDetails.new_password}
          placeholder="Password"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
        <input
          name="confirm_new_password"
          value={passwordDetails.confirm_new_password}
          placeholder="Confirm Password"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
      </div>

      <Button
        size={"xl"}
        disabled={!selectedUserType || loading}
        className="w-full text-xl font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        onClick={handleSubmit}
      >
        {loading ? (
          <LoaderCircle className="animate-spin size-8" />
        ) : (
          "Set Password"
        )}
      </Button>
      {redirect && <RedirectOnPasswordSet />}
    </div>
  );
};

export default ClientResetPassword;
