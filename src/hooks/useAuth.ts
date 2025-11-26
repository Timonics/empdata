import type { LoginData } from "@/interfaces/auth.interface";
import {
  loginAdmin,
  logoutAdmin,
  adminForgotPassword,
} from "@/store/slices/admin_auth.slice";
import type { AppDispatch, RootState } from "@/store/store";
import type { AuthType } from "@/types/auth.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = (authType: AuthType) => {
  const dispatch: AppDispatch = useDispatch();

  const authState = useSelector((state: RootState) => {
    switch (authType) {
      case "admin":
        return state.adminAuth;
      case "company":
        //company auth slice to be implemented
        return state.adminAuth;
      case "employee":
        //employee auth slice to be implemented
        return state.adminAuth;
      default:
        return state.adminAuth;
    }
  });

  const loginMap = {
    admin: loginAdmin,
    company: loginAdmin,
    employee: loginAdmin,
  };

  const logoutMap = {
    admin: logoutAdmin,
    company: logoutAdmin,
    employee: logoutAdmin,
  };

  const forgotPasswordMap = {
    admin: adminForgotPassword,
    company: adminForgotPassword,
    employee: adminForgotPassword,
  };

  const login = useCallback(
    (loginData: LoginData) => {
      const action = loginMap[authType] ?? loginAdmin;
      return dispatch(action(loginData));
    },
    [dispatch, authType]
  );

  const logout = useCallback(() => {
    const action = logoutMap[authType] ?? loginAdmin;
    return dispatch(action());
  }, [dispatch, authType]);

  const forgotPassword = useCallback(
    (email: string) => {
      const action = forgotPasswordMap[authType] ?? adminForgotPassword;
      return dispatch(action(email));
    },
    [dispatch, authType]
  );

  return {
    login,
    logout,
    forgotPassword,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    authData: authState.authData,
  };
};
