import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { IResetPassword } from "@/interfaces/auth.interface";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

const ResetPassword: React.FC = () => {
  const { loading, resetPassword } = useAuth("admin");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const reset_token = queryParams.get("reset_token");
  const user_email = queryParams.get("user_email");

  const [passwordDetails, setPasswordDetails] = useState({
    old_password: "",
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
      toast.success(result.message || "Password has been reset successfully.");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Reset Password</h2>
        {/* <p className="text-sm md:text-base font-light text-black/70">
          Secure login access for administrators.
        </p> */}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <input
          name="old_password"
          value={passwordDetails.old_password}
          placeholder="Old Password"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
        <input
          name="new_password"
          value={passwordDetails.new_password}
          placeholder="New Password"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
        <input
          name="confirm_new_password"
          value={passwordDetails.confirm_new_password}
          placeholder="Confirm New Password"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={handleChange}
        />
      </div>

      <Button
        size={"xl"}
        className="w-full text-xl font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        onClick={handleSubmit}
      >
        {loading ? (
          <LoaderCircle className="animate-spin size-8" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </div>
  );
};

export default ResetPassword;
