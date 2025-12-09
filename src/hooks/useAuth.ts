import type { IResetPassword, LoginData } from "@/interfaces/auth.interface";
import {
  loginAdmin,
  logoutAdmin,
  adminForgotPassword,
  adminResetPassword,
} from "@/store/slices/admin_auth.slice";
import {
  loginCompany,
  loginEmployee,
  setPassword,
  logoutClients,
  verifyNIN,
} from "@/store/slices/clients_auth.slice";
import type { AppDispatch, RootState } from "@/store/store";
import type { AuthType } from "@/types/auth.types";
import type { VerifyNIN } from "@/types/employee.type";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = (authType: AuthType) => {
  const dispatch: AppDispatch = useDispatch();

  const authState =
    authType === "admin"
      ? useSelector((state: RootState) => state.adminAuth)
      : useSelector((state: RootState) => state.clientsAuth) ?? {
          isAuthenticated: false,
          loading: false,
          error: null,
          clientsAuthData: null,
        };

  const loginMap = {
    admin: loginAdmin,
    company: loginCompany,
    employee: loginEmployee,
  };

  const logoutMap = {
    admin: logoutAdmin,
    company: logoutClients,
    employee: logoutClients,
  };

  const forgotPasswordMap = {
    admin: adminForgotPassword,
  };

  const resetPasswordMap = {
    admin: adminResetPassword,
    company: setPassword,
    employee: setPassword,
  };

  const login = useCallback(
    (loginData: LoginData) => {
      const action = loginMap[authType!] ?? loginAdmin;
      return dispatch(action(loginData));
    },
    [dispatch, authType]
  );

  const logout = useCallback(() => {
    const action = logoutMap[authType!] ?? loginAdmin;
    return dispatch(action());
  }, [dispatch, authType]);

  const forgotPassword = useCallback(
    (email: string) => {
      const action = forgotPasswordMap["admin"] ?? adminForgotPassword;
      return dispatch(action(email));
    },
    [dispatch, authType]
  );

  const resetPassword = useCallback(
    (resetData: IResetPassword) => {
      const action = resetPasswordMap[authType!] ?? adminResetPassword;
      return dispatch(action(resetData));
    },
    [dispatch, authType]
  );

  const ninVerify = useCallback(
    (employeeId: number, ninData: VerifyNIN) => {
      if (authType !== "employee") {
        throw new Error("NIN verification is only for employees");
      }
      return dispatch(verifyNIN({ employeeId, ninData }));
    },
    [dispatch, authType]
  );

  return {
    login,
    logout,
    forgotPassword,
    resetPassword,
    ninVerify,
    isVerified:
      authType === "employee" &&
      "clientsAuthData" in authState &&
      authState.clientsAuthData?.nin_verification?.is_nin_verified === true,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    authData: "authData" in authState ? authState.authData : null,
    clientsAuthData:
      "clientsAuthData" in authState ? authState.clientsAuthData : null,
  };
};
