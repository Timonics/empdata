import type { LoginData } from "@/interfaces/auth.interface";
import { loginAdmin, logoutAdmin } from "@/store/slices/admin_auth.slice";
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
        return state.adminAuth;
      case "employee":
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

  return {
    login,
    logout,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    authData: authState.authData,
  };
};
