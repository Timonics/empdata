// sections/DocumentUploadSection.tsx
import React from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  type IndividualOnboarding,
  type CompanyGroupLifeOnboarding,
} from "@/types/onboarding.type";

interface DocumentUploadSectionProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  setOnBoardingData: React.Dispatch<
    React.SetStateAction<
      CompanyGroupLifeOnboarding | IndividualOnboarding | null
    >
  >;
  identityCardPreview: string;
  setIdentityCardPreview: React.Dispatch<React.SetStateAction<string>>;
  cacPreview: string;
  setCacPreview: React.Dispatch<React.SetStateAction<string>>;
  passportPreview: string;
  setPassportPreview: React.Dispatch<React.SetStateAction<string>>;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  accountType,
  setOnBoardingData,
  identityCardPreview,
  setIdentityCardPreview,
  cacPreview,
  setCacPreview,
  passportPreview,
  setPassportPreview,
}) => {
  const handleIdentityCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const allowed = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowed.includes(file.type)) {
      toast.error("Identity card must be a PDF or image");
      return;
    }

    const newImage = URL.createObjectURL(file);
    setIdentityCardPreview(newImage);

    setOnBoardingData((prevState) => {
      if (
        accountType === "corporate" ||
        accountType === "Employee Group Life"
      ) {
        return {
          ...prevState,
          director_identity_cards: file,
        } as CompanyGroupLifeOnboarding;
      } else {
        return {
          ...prevState,
          identity_cards: file,
        } as IndividualOnboarding;
      }
    });
  };

  const removeImage = (
    type: "identity_card" | "cac" | "passport",
  ) => {
    if (type === "identity_card") {
      setIdentityCardPreview("");
      setOnBoardingData((prevState) => {
        if (
          accountType === "corporate" ||
          accountType === "Employee Group Life"
        ) {
          return {
            ...prevState,
            director_identity_cards: undefined,
          } as CompanyGroupLifeOnboarding;
        } else {
          return {
            ...prevState,
            identity_cards: undefined,
          } as IndividualOnboarding;
        }
      });
    } else if (type === "cac") {
      setCacPreview("");
      setOnBoardingData(
        (prevState) =>
          ({
            ...prevState,
            cac_document: undefined,
          } as CompanyGroupLifeOnboarding)
      );
    } else {
      setPassportPreview("");
      setOnBoardingData((prevState) => {
        if (!prevState) return prevState;

        if (
          accountType === "corporate" ||
          accountType === "Employee Group Life"
        ) {
          return {
            ...prevState,
            director_passport_photograph: undefined,
          } as CompanyGroupLifeOnboarding;
        } else {
          return {
            ...prevState,
            passport_photograph: undefined,
          } as IndividualOnboarding;
        }
      });
    }
  };

  const handleCacUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const allowed = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowed.includes(file.type)) {
      toast.error("CAC document must be a PDF or image");
      return;
    }

    const img = URL.createObjectURL(file);
    setCacPreview(img);

    setOnBoardingData(
      (prevState) =>
        ({
          ...prevState,
          cac_document: file,
        } as CompanyGroupLifeOnboarding)
    );
  };

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Passport photograph must be an image");
      return;
    }

    const img = URL.createObjectURL(file);
    setPassportPreview(img);

    setOnBoardingData((prevState) => {
      if (!prevState) return prevState;

      if (
        accountType === "corporate" ||
        accountType === "Employee Group Life"
      ) {
        return {
          ...prevState,
          director_passport_photograph: file,
        } as CompanyGroupLifeOnboarding;
      } else {
        return {
          ...prevState,
          passport_photograph: file,
        } as IndividualOnboarding;
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 my-4">
      <div className="border border-gray-200 p-4 py-6">
        <div className="flex flex-col gap-4">
          <h6 className="text-black/75 font-semibold text-lg">
            {accountType === "corporate" && "Director's"} Identity Card:{" "}
            <span className="text-red-500">*</span>
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
            {!identityCardPreview && (
              <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                <span className="text-sm text-foreground/70 text-center">
                  Upload Identity Card
                </span>
                <input
                  type="file"
                  accept="application/pdf,image/png,image/jpeg"
                  onChange={handleIdentityCardUpload}
                  className="hidden"
                />
              </label>
            )}

            {identityCardPreview && (
              <div className="relative aspect-square">
                <img
                  src={identityCardPreview || "/placeholder.svg"}
                  alt={`Upload Cac doc`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage("identity_card")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {accountType === "corporate" && (
        <div className="border border-gray-200 p-4 py-6">
          <div className="flex flex-col gap-4">
            <h6 className="text-black/75 font-semibold text-lg">
              CAC Document: <span className="text-red-500">*</span>
            </h6>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
              {!cacPreview && (
                <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                  <span className="text-sm text-foreground/70 text-center">
                    Upload CAC Document
                  </span>
                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={handleCacUpload}
                    className="hidden"
                  />
                </label>
              )}

              {cacPreview && (
                <div className="relative aspect-square">
                  <img
                    src={cacPreview || "/placeholder.svg"}
                    alt={`Upload Cac doc`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("cac")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 p-4 py-6">
        <div className="flex flex-col gap-4">
          <h6 className="text-black/75 font-semibold text-lg">
            {accountType === "corporate" && "Director's"} Passport Photograph:{" "}
            <span className="text-red-500">*</span>
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
            {!passportPreview && (
              <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                <span className="text-sm text-foreground/70 text-center">
                  Upload Passport Photograph
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handlePassportUpload}
                  className="hidden"
                />
              </label>
            )}

            {passportPreview && (
              <div className="relative aspect-square">
                <img
                  src={passportPreview || "/placeholder.svg"}
                  alt={`Upload passport`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage("passport")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;
