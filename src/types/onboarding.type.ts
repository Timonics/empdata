export type CompanyGroupLifeOnboarding = {
  company_name?: string;
  rc_number?: string;
  country?: string;
  state?: string;
  city?: string;
  phone_number?: string;
  confirm_phone_number?: string;
  secondary_phone?: string;
  email_address?: string;
  confirm_email_address?: string;
  house_address?: string;
  previous_address?: string;
  director_name?: string;
  director_bvn_number?: string;
  director_bvn_iv?: string;
  director_bvn_data?: string;
  director_bvn_tag?: string;
  director_bank_name?: string;
  director_bank_acct_number?: string;
  director_tax_identification_number?: string;
  director_national_identification_number?: string;
  identity_card_type?:
    | "nin"
    | "drivers_license"
    | "international_passport"
    | "voters_card";
  identity_card_number?: string;
  nin_number_iv?: string;
  nin_number_data?: string;
  nin_number_tag?: string;
  director_identity_cards?: string[] | File[];
  cac_document?: string | File;
  director_passport_photograph?: string | File;
  consent_checkbox?: boolean;

  status?: string;
  verification_status?: string;
  account_status?: string;
};

export type IndividualOnboarding = {
  title?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  gender?: string;
  date_of_birth?: string | Date | null;
  nationality?: string;
  phone_number?: string;
  confirm_phone_number?: string;
  foreign_number?: string;
  email_address?: string;
  confirm_email_address?: string;
  country?: string;
  state?: string;
  city?: string;
  house_address?: string;
  previous_address?: string;
  bvn?: string;
  bank_name?: string;
  bank_account_number?: string;
  bvn_number?: string;
  bvn_iv?: string;
  bvn_data?: string;
  bvn_tag?: string;
  national_identification_number?: string;
  identity_card_type?:
    | "nin"
    | "drivers_license"
    | "international_passport"
    | "voters_card";
  identity_card_number?: string;
  nin_number_iv?: string;
  nin_number_data?: string;
  nin_number_tag?: string;
  identity_cards?: string[] | File[];
  passport_photograph?: string | File;
  consent_checkbox?: boolean;

  status?: string;
  verification_status?: string;
  account_status?: string;
};
