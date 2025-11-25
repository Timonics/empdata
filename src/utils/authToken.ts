import type { AuthType } from "@/types/auth.types";

let _admin_token: string | null = null;
let _company_token: string | null = null;
let _employee_token: string | null = null;

export const setAdminAuthToken = (token: string) => (_admin_token = token);
export const setCompanyAuthToken = (token: string) => (_company_token = token);
export const setRmployeeAuthToken = (token: string) =>
  (_employee_token = token);

export const getAuthToken = (type: AuthType): string | null => {
  return type === "admin"
    ? _admin_token
    : type === "company"
    ? _company_token
    : type === "employee"
    ? _employee_token
    : null;
};
