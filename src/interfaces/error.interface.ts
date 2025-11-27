import type { ApiResponse } from "./auth.interface";

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