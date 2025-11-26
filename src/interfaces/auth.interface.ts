import type { ApiError } from "@/types/api-error.type";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
}

export interface AuthState {
  authData: User | null;
  isAuthenticated: boolean;
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | ApiError | null;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: { user: User };
  token: string;
}

export interface UnauthorizedErrorResponse
  extends Omit<ApiResponse, "data" | "token"> {
  errors: {
    credientials: string[];
  };
}

export interface UnprrocessableErrorResponse
  extends Omit<ApiResponse, "data" | "token"> {
  errors: {
    email?: string[];
    password?: string[];
  };
}

export interface ForbiddenErrorResponse
  extends Omit<ApiResponse, "data" | "token"> {}

export interface IResetPassword {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
