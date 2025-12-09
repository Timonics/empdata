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
  employee_id: number
  nin_verification?: {
    has_submitted_nin: boolean;
    is_nin_verified: boolean;
    nin_verified_at: string | null;
  } | null;
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

export interface NINResponse extends Omit<ApiResponse, "data"> {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    has_submitted_nin: boolean;
    is_nin_verified: boolean;
    nin_verified_at: string;
    nin_data: {
      firstname: string;
      middlename: string;
      surname: string;
      phone: string;
      gender: string;
      birthdate: string;
      birth_info: {
        country: string;
        state: string;
        lga: string;
      };
      residence_info: {
        state: string;
        town: string;
        lga: string;
        address: string;
      };
      photo: string;
      report_id: string;
    };
  };
}

export interface IResetPassword {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
