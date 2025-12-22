import type {
  CompanyGroupLifeOnboarding,
  IndividualOnboarding,
} from "@/types/onboarding.type";
import { toast } from "sonner";

export const validateOnboardingData = (
  accountType: "corporate" | "individual" | "Employee Group Life" | null,
  onBoardingData: CompanyGroupLifeOnboarding | IndividualOnboarding | null
) => {
  if (!onBoardingData) {
    toast.error("Please fill in all required fields");
    return false;
  }

  // Common validations for all account types
  if (!onBoardingData.phone_number || !onBoardingData.email_address) {
    toast.error("Phone number and email address are required");
    return false;
  }

  // Email confirmation
  if (onBoardingData.email_address !== onBoardingData.confirm_email_address) {
    toast.error("Email addresses do not match");
    return false;
  }

  // Phone confirmation
  if (onBoardingData.phone_number !== onBoardingData.confirm_phone_number) {
    toast.error("Phone numbers do not match");
    return false;
  }

  // Account type specific validations
  if (accountType === "corporate") {
    const corporateData = onBoardingData as CompanyGroupLifeOnboarding;
    if (
      !corporateData.company_name ||
      !corporateData.rc_number ||
      !corporateData.director_bvn_number
    ) {
      toast.error("Please fill in all required company information");
      return false;
    }
  } else if (accountType === "individual") {
    const individualData = onBoardingData as IndividualOnboarding;
    if (
      !individualData.first_name ||
      !individualData.last_name ||
      !individualData.gender
    ) {
      toast.error("Please fill in all required personal information");
      return false;
    }
  }

  // Location validation
  if (
    !onBoardingData.country ||
    !onBoardingData.state ||
    !onBoardingData.city
  ) {
    toast.error("Please fill in all location information");
    return false;
  }

  // Address validation
  if (!onBoardingData.house_address) {
    toast.error("Please fill in address information");
    return false;
  }

  // Bank information validation - handle both types
  if (accountType === "corporate") {
    const corporateData = onBoardingData as CompanyGroupLifeOnboarding;
    if (
      !corporateData.director_bank_name ||
      !corporateData.director_bank_acct_number
    ) {
      toast.error("Please fill in all required bank information");
      return false;
    }
  } else {
    const individualData = onBoardingData as IndividualOnboarding;
    if (!individualData.bank_name || !individualData.bank_account_number) {
      toast.error("Please fill in all required bank information");
      return false;
    }
  }

  // Identity validation
  if (
    !onBoardingData.identity_card_type ||
    !onBoardingData.identity_card_number
  ) {
    toast.error("Please provide identity information");
    return false;
  }

  // Document validation
  const hasIdentityCards =
    "director_identity_cards" in onBoardingData
      ? !!onBoardingData.director_identity_cards
      : "identity_cards" in onBoardingData
      ? !!onBoardingData.identity_cards
      : false;

  if (!hasIdentityCards) {
    toast.error("Please upload at least one identity card");
    return false;
  }

  const hasPassportPhoto =
    "director_passport_photograph" in onBoardingData
      ? !!onBoardingData.director_passport_photograph
      : "passport_photograph" in onBoardingData
      ? !!onBoardingData.passport_photograph
      : false;

  if (!hasPassportPhoto) {
    toast.error("Please upload passport photograph");
    return false;
  }

  // CAC validation for corporate accounts only
  if (
    accountType === "corporate" &&
    !(onBoardingData as CompanyGroupLifeOnboarding).cac_document
  ) {
    toast.error("Please upload CAC document");
    return false;
  }

  // Consent validation
  if (!onBoardingData.consent_checkbox) {
    toast.error("Please agree to the terms and conditions");
    return false;
  }

  return true;
};
