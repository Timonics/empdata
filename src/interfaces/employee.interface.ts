export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  employee_number: string;
  department: string;
  position: string;
  employment_status: string;
  has_portal_access: boolean;
  hire_date: string;
  created_at: string;
}

export interface EmployeeResponse {
  success: boolean;
  message?: string;
  data: Employee[] | Employee;
}
