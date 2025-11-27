import type {
  ForbiddenErrorResponse,
  UnauthorizedErrorResponse,
  UnprrocessableErrorResponse,
} from "@/interfaces/error.interface";
import type { ApiError } from "@/types/api-error.type";
import type { AxiosError } from "axios";

export const normalizeError = (error: AxiosError): ApiError => {
  const status = error.response?.status;

  const data: any = error.response?.data;

  switch (status as number) {
    case 401:
      return {
        success: false,
        status,
        message: data?.message || "Unauthorized Access",
        errors: data?.errors,
      } as UnauthorizedErrorResponse;

    case 422:
      return {
        success: false,
        status,
        message: data?.message || "Validation error",
        errors: data?.errors,
      } as UnprrocessableErrorResponse;

    case 403:
      return {
        success: false,
        status,
        message: data?.message || "Forbidden",
        errors: data?.errors,
      } as ForbiddenErrorResponse;

    default:
      return {
        success: false,
        status,
        message: data?.message || "Unexpected error",
        errors: data?.errors,
      };
  }
};
