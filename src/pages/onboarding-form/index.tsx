import React, { useState } from "react";
import { toast } from "sonner";

import Logo from "../../components/logo";
import { useOnboardGroupLifeCompany } from "@/hooks/useOnboarding";
import {
  type IndividualOnboarding,
  type CompanyGroupLifeOnboarding,
} from "@/types/onboarding.type";
import { encryptData } from "@/utils/encrypt";

import AccountTypeSelector from "./components/AccountTypeSelect";
import PolicyPlanSelector from "./components/PolicyPlanSelector";
import BioDataSection from "./components/BioDataSection";
import BankInfoSection from "./components/BankInfoSection";
import IdentityInfoSection from "./components/IdentityInfoSection";
import DocumentUploadSection from "./components/DocumentUploadSection";
import { debugFormData } from "@/utils/debug_formdata";
import { validateFiles } from "@/utils/validateFiles";
import BeneficariesSection from "./components/BeneficariesSection";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { addRegistration } from "@/store/slices/onboarding.slice";

const OnBoardingForm: React.FC = () => {
  const onboardCompanyGroupLife = useOnboardGroupLifeCompany();

  const [accountType, setAccountType] = useState<
    "individual" | "corporate" | "Employee Group Life" | null
  >("individual");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [openPolicyPlan, setOpenPolicyPlan] = useState<boolean>(false);

  const [identityCardPreview, setIdentityCardPreview] = useState<string[]>([]);
  const [cacPreview, setCacPreview] = useState<string>("");
  const [passportPreview, setPassportPreview] = useState<string>("");

  const [gender, setGender] = useState("");
  const [openGender, setOpenGender] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

  const [onBoardingData, setOnBoardingData] = useState<
    CompanyGroupLifeOnboarding | IndividualOnboarding | null
  >(null);

  //For Dummy Data
  const dispatch: AppDispatch = useDispatch();

  console.log(onBoardingData);

  const buildFormData = (
    data: CompanyGroupLifeOnboarding | IndividualOnboarding | any,
    accountType: string
  ) => {
    const formData = new FormData();

    // Handle identity cards based on account type
    if (accountType === "corporate" || accountType === "Employee Group Life") {
      // Corporate - use director_identity_cards
      if (
        data.director_identity_cards &&
        Array.isArray(data.director_identity_cards)
      ) {
        data.director_identity_cards.forEach((file: File) => {
          // Try with brackets [] since backend seems to expect that format
          formData.append(`director_identity_cards[]`, file);
        });
      }
    } else if (accountType === "individual") {
      // Individual - use identity_cards
      if (data.identity_cards && Array.isArray(data.identity_cards)) {
        data.identity_cards.forEach((file: File) => {
          formData.append(`identity_cards[]`, file);
        });
      }
    }

    // Handle CAC document (corporate only)
    if (
      accountType === "corporate" &&
      data.cac_document &&
      data.cac_document instanceof File
    ) {
      formData.append("cac_document", data.cac_document);
    }

    // Handle passport photograph based on account type
    if (accountType === "corporate" || accountType === "Employee Group Life") {
      if (
        data.director_passport_photograph &&
        data.director_passport_photograph instanceof File
      ) {
        formData.append(
          "director_passport_photograph",
          data.director_passport_photograph
        );
      }
    } else if (accountType === "individual") {
      if (
        data.passport_photograph &&
        data.passport_photograph instanceof File
      ) {
        formData.append("passport_photograph", data.passport_photograph);
      }
    }

    // Append all other fields
    Object.entries(data).forEach(([key, value]) => {
      // Skip if it's undefined, null, or we already handled it as a file
      if (
        value === undefined ||
        value === null ||
        key === "director_identity_cards" ||
        key === "identity_cards" ||
        key === "cac_document" ||
        key === "director_passport_photograph" ||
        key === "passport_photograph"
      ) {
        return;
      }

      // Handle booleans
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
        return;
      }

      // Handle dates
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
        return;
      }

      // Handle arrays (non-file arrays)
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
        return;
      }

      // Everything else (strings, numbers)
      formData.append(key, String(value));
    });

    return formData;
  };

  const validateOnboardingData = () => {
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
    if (!onBoardingData.house_address || !onBoardingData.previous_address) {
      toast.error("Please fill in all address information");
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
        ? onBoardingData.director_identity_cards?.length! > 0
        : "identity_cards" in onBoardingData
        ? onBoardingData.identity_cards?.length! > 0
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

  const handleSubmit = async () => {
    if (!validateOnboardingData()) {
      return;
    }

    const fileErrors = validateFiles(accountType || "", onBoardingData);
    if (fileErrors.length > 0) {
      fileErrors.forEach((error) => toast.error(error));
      return;
    }

    console.log("All Validations Passed");

    try {
      if (
        accountType === "corporate" ||
        accountType === "Employee Group Life"
      ) {
        // Handle CompanyGroupLifeOnboarding
        const companyData = onBoardingData as CompanyGroupLifeOnboarding;

        if (!companyData.director_bvn_number) {
          toast.error("BVN number is required");
          return;
        }

        // Encrypt BVN
        const encryptedBvnData = await encryptData(
          "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
          companyData.director_bvn_number
        );

        let payload: CompanyGroupLifeOnboarding = {
          ...companyData,
          director_bvn_data: encryptedBvnData.data,
          director_bvn_iv: encryptedBvnData.iv,
          director_bvn_tag: encryptedBvnData.tag,
        };

        // Encrypt NIN only if needed
        if (
          payload.identity_card_type === "nin" &&
          payload.director_national_identification_number
        ) {
          const encryptedNinData = await encryptData(
            "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
            payload.director_national_identification_number
          );

          payload = {
            ...payload,
            nin_number_data: encryptedNinData.data,
            nin_number_iv: encryptedNinData.iv,
            nin_number_tag: encryptedNinData.tag,
          };
        }

        const formData = buildFormData(payload, accountType || "");
        debugFormData(formData);

        //for Dummy Data
        dispatch(
          addRegistration({
            id: crypto.randomUUID(),
            type: "individual",
            createdAt: new Date().toISOString(),
            data: {
              ...payload,
              status: "pending-approval",
              account_status: "pending",
              verification_status: "not-verified",
            },
          })
        );

        await onboardCompanyGroupLife.mutateAsync(formData);
      } else {
        // Handle IndividualOnboarding
        const individualData = onBoardingData as IndividualOnboarding;

        if (!individualData.bvn) {
          toast.error("BVN number is required");
          return;
        }

        // Encrypt BVN for individual
        const encryptedBvnData = await encryptData(
          "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
          individualData.bvn
        );

        const payload: IndividualOnboarding = {
          ...individualData,
          bvn_data: encryptedBvnData.data,
          bvn_iv: encryptedBvnData.iv,
          bvn_tag: encryptedBvnData.tag,
        };

        // Encrypt NIN for individual if needed
        if (
          payload.identity_card_type === "nin" &&
          payload.national_identification_number
        ) {
          const encryptedNinData = await encryptData(
            "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
            payload.national_identification_number
          );

          payload.nin_number_data = encryptedNinData.data;
          payload.nin_number_iv = encryptedNinData.iv;
          payload.nin_number_tag = encryptedNinData.tag;
        }

        const formData = buildFormData(payload, accountType || "");
        debugFormData(formData);

        //for Dummy Data
        dispatch(
          addRegistration({
            id: crypto.randomUUID(),
            type: "individual",
            createdAt: new Date().toISOString(),
            data: {
              ...payload,
              status: "pending-approval",
              account_status: "pending",
              verification_status: "not-verified",
            },
          })
        );

        // You'll need a different hook for individual onboarding
        // await onboardIndividual.mutateAsync(formData);
        toast.success("You have successfully onboarded...");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
      console.error("Submission error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-sky-50/50 w-full"
      onClick={() => {
        if (openAccountType || openPolicyPlan) {
          setOpenAccountType(false);
          setOpenPolicyPlan(false);
        }
      }}
    >
      <div className="p-4 shadow-xl">
        <Logo />
      </div>
      <div className="flex flex-col mt-8 items-center p-4 gap-10">
        <h2 className="font-bold text-4xl text-center">
          SCIB ONBOARDING KYC FORM
        </h2>
        <div className="max-w-5xl w-full bg-white shadow-2xl shadow-black/40 rounded-md p-8 flex flex-col gap-4 min-h-[600px]">
          <AccountTypeSelector
            accountType={accountType}
            openAccountType={openAccountType}
            setAccountType={setAccountType}
            setOpenAccountType={setOpenAccountType}
            setOpenPolicyPlan={setOpenPolicyPlan}
            setSelectedPlan={setSelectedPlan}
            setOnBoardingData={setOnBoardingData}
          />

          {accountType && (
            <PolicyPlanSelector
              accountType={accountType}
              selectedPlan={selectedPlan}
              openPolicyPlan={openPolicyPlan}
              setSelectedPlan={setSelectedPlan}
              setOpenPolicyPlan={setOpenPolicyPlan}
            />
          )}

          {accountType && (
            <>
              <BioDataSection
                accountType={accountType}
                openGender={openGender}
                setOpenGender={setOpenGender}
                gender={gender}
                setGender={setGender}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onBoardingData={onBoardingData}
                setOnBoardingData={setOnBoardingData}
              />

              <BankInfoSection
                accountType={accountType}
                onBoardingData={onBoardingData}
                setOnBoardingData={setOnBoardingData}
              />

              {accountType === "Employee Group Life" && (
                <BeneficariesSection
                  onBoardingData={onBoardingData}
                  setOnBoardingData={setOnBoardingData}
                />
              )}

              <IdentityInfoSection
                accountType={accountType}
                setOnBoardingData={setOnBoardingData}
              />

              <DocumentUploadSection
                accountType={accountType}
                setOnBoardingData={setOnBoardingData}
                identityCardPreview={identityCardPreview}
                setIdentityCardPreview={setIdentityCardPreview}
                cacPreview={cacPreview}
                setCacPreview={setCacPreview}
                passportPreview={passportPreview}
                setPassportPreview={setPassportPreview}
              />

              <div className="flex gap-4 items-start">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  onChange={(e) =>
                    setOnBoardingData((prev) => ({
                      ...prev,
                      consent_checkbox: e.target.checked,
                    }))
                  }
                />
                <p className="font-medium text-lg">
                  By completing this form, you consent to us collecting and
                  processing your personal information to provide services to
                  you. You further consent that this information shall be
                  available to third-party service providers if required to
                  carry out this service(s). You agree that your personal data
                  may be released in compliance with a legal obligation to which
                  we are subject.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 border w-fit px-20 py-3 rounded-md text-lg border-gray-400 bg-black/5 hover:bg-black/10"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingForm;
