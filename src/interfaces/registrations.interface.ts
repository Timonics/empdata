export interface CompanyGroupLifeRegistrations {
  success: boolean;
  data: [
    {
      id: number;
      company_name: string;
      email_address: string;
      phone_number: string;
      country: string;
      state: string;
      city: string;
      submission_type: string;
      status: string;
      account_status: string;
      verification_status: string;
      submitted_at: string;
      approved_at: Date | null;
      rejected_at: Date | null;
    }
  ];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}
