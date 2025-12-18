export type CompanyGroupLifeOnboarding = {
  company_name?: string | "";
  rc_number?: string;
  country?: string;
  state?: string;
  city?: string;
  phone_number?: string;
  secondary_phone?: string;
  email_address?: string;
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
  consent_given?: boolean;
};

export type IndividualOnboarding = {
  title?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  gender?: string;
  nationality?: string;
  phone_number?: string;
  foreign_number?: string;
  email_address?: string;
  country?: string;
  state?: string;
  city?: string;
  house_address?: string;
  previous_house_address?: string;
  bvn?: string;
  bank_name?: string;
  bank_account_number?: string;
};
