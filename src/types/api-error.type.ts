import type {
  ForbiddenErrorResponse,
  UnauthorizedErrorResponse,
  UnprrocessableErrorResponse,
} from "@/interfaces/auth.interface";

export type ApiError =
  | UnauthorizedErrorResponse
  | UnprrocessableErrorResponse
  | ForbiddenErrorResponse
  | { message: string; status: number; errors?: any };
