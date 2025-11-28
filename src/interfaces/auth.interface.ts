import type { ApiError } from "@/types/api-error.type";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export interface AuthState {
  authData: User | null;
  isAuthenticated: boolean;
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | ApiError | null;
}

export interface Client extends User {
  role: "company_admin" | "employee";
  created_at?: string;
}

export interface ClientsAuthState extends Omit<AuthState, "authData"> {
  clientsAuthData: Client | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: { user: T; token: string };
}

export interface IResetPassword {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
