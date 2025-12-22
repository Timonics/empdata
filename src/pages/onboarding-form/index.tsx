import React, { useEffect, useState } from "react";
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
import { validateOnboardingData } from "@/utils/validateOnboardingData";
import { buildFormData } from "@/utils/build_form_data";
import SuccessfullyOnboarded from "@/components/successful-onboard";

const OnBoardingForm: React.FC = () => {
  const onboardCompanyGroupLife = useOnboardGroupLifeCompany();

  const [accountType, setAccountType] = useState<
    "individual" | "corporate" | "Employee Group Life" | null
  >("individual");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [openPolicyPlan, setOpenPolicyPlan] = useState<boolean>(false);

  const [identityCardPreview, setIdentityCardPreview] = useState<string>("");
  const [cacPreview, setCacPreview] = useState<string>("");
  const [passportPreview, setPassportPreview] = useState<string>("");

  const [gender, setGender] = useState("");
  const [openGender, setOpenGender] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  const [onBoardingData, setOnBoardingData] = useState<
    CompanyGroupLifeOnboarding | IndividualOnboarding | null
  >(null);


  console.log(onBoardingData);

  const handleSubmit = async () => {
    if (!validateOnboardingData(accountType, onBoardingData)) {
      return;
    }

    const fileErrors = validateFiles(accountType || "", onBoardingData);
    if (fileErrors.length > 0) {
      fileErrors.forEach((error) => toast.error(error));
      return;
    }

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
          payload.identity_card_type === "National Identity Number" &&
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
          payload.identity_card_type === "National Identity Number" &&
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

        // You'll need a different hook for individual onboarding
        // await onboardIndividual.mutateAsync(formData);
        toast.success("You have successfully onboarded...");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (onboardCompanyGroupLife.isSuccess && !hasShownSuccess) {
      setShowSuccessMsg(true);
      setHasShownSuccess(true);

      // Reset form data
      setOnBoardingData(null);
      setAccountType("individual");
      setSelectedPlan("");
      setGender("");
      setSelectedDate(null);
      setIdentityCardPreview("");
      setCacPreview("");
      setPassportPreview("");

      const timer = setTimeout(() => {
        setShowSuccessMsg(false);
      }, 4000);

      return () => clearTimeout(timer);
    }

    // Reset hasShownSuccess when mutation resets
    if (onboardCompanyGroupLife.isIdle) {
      setHasShownSuccess(false);
    }
  }, [
    onboardCompanyGroupLife.isSuccess,
    onboardCompanyGroupLife.isIdle,
    hasShownSuccess,
  ]);

  // Handle error state
  useEffect(() => {
    if (onboardCompanyGroupLife.isError) {
      toast.error("Submission failed. Please try again.");
    }
  }, [onboardCompanyGroupLife.isError]);

  // if(onboardIndividual.isSuccess && !onboardIndividual.isPending) {
  // }

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
                  I hereby consent to Scib Nigeria & Co. Limited collecting,
                  processing, and transferring my personal and employment
                  information to the relevant insurer(s) for the purpose of
                  administering and managing the Group Life Insurance Policy. I
                  confirm that the information provided is true and accurate to
                  the best of my knowledge.
                  <br />
                  <br />I understand that my data is being collected and
                  processed in compliance with applicable legal and regulatory
                  requirements, including data protection and insurance
                  regulations. All information will be handled confidentially
                  and in accordance with Scib's Data Protection and Privacy
                  Policy and applicable data protection laws.
                  <br />
                  <br />I further acknowledge that my data may be used for
                  policy administration, underwritingm claims processing,
                  regulatory compliance, and related communications.
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
      {showSuccessMsg && <SuccessfullyOnboarded />}
    </div>
  );
};

export default OnBoardingForm;
