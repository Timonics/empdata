export type CreateEmployee = {
  company_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
};

export type VerifyNIN = {
  iv: string;
  data: string;
  tag: string;
};
