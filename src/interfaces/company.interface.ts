export interface Company {
  id: number;
  name: string;
  email: string;
  rc_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  insurance_type?: string;
  registration_date?: string;
  license_number?: string;
  status: "active" | "inactive";
  portal_users_count?: number;
  employees_count?: number;
  admins?: [{ id: number; name: string; email: string; password_set: boolean }];
  created_at: string;
  updated_at?: string;
}

export interface CompanyResponse {
  success: boolean;
  message?: string;
  data: Company[] | Company;
}
