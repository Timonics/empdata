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
} from "@/store/slices/clients_auth.slice";
import type { AppDispatch, RootState } from "@/store/store";
import type { AuthType } from "@/types/auth.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = (authType: AuthType) => {
  const dispatch: AppDispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);

  const authState =
    authType === "admin"
      ? rootState.adminAuth
      : rootState.clientsAuth ?? {
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

  return {
    login,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    authData: "authData" in authState ? authState.authData : null,
    clientsAuthData: "clientsAuthData" in authState ? authState.clientsAuthData : null
  };
};
