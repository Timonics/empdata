import type { ApiError } from "@/types/api-error.type";

export interface LoginData {
  email: string;
  password: string;
}

export interface Auth {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
}

export interface AuthState {
  authData: Auth | null;
  isAuthenticated: boolean;
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | ApiError | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: Auth;
  token: string;
}

export interface UnauthorizedErrorResponse
  extends Omit<AuthResponse, "data" | "token"> {
  errors: {
    credientials: string[];
  };
}

export interface UnprrocessableErrorResponse
  extends Omit<AuthResponse, "data" | "token"> {
  errors: {
    email?: string[];
    password?: string[];
  };
}

export interface ForbiddenErrorResponse
  extends Omit<AuthResponse, "data" | "token"> {}
