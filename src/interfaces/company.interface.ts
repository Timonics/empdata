export interface Company {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  portal_users_count?: number;
  created_at: string;
}

export interface CompanyResponse {
  success: boolean;
  message?: string;
  data: Company[] | Company;
}
