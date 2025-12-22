// sections/IdentityInfoSection.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  type IndividualOnboarding,
  type CompanyGroupLifeOnboarding,
} from "@/types/onboarding.type";

interface IdentityInfoSectionProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  setOnBoardingData: React.Dispatch<
    React.SetStateAction<
      CompanyGroupLifeOnboarding | IndividualOnboarding | null
    >
  >;
}

const IdentityInfoSection: React.FC<IdentityInfoSectionProps> = ({
  accountType,
  setOnBoardingData,
}) => {
  const [openIdentityType, setOpenIdentityType] = useState<boolean>(false);
  const [identityType, setIdentityType] = useState<string>("");

  const identityCardType: {
    name: string;
    type:
      | "National Identification Number"
      | "Driver's License"
      | "International Passport"
      | "Voter's Card";
  }[] = [
    { name: "Voter's Card", type: "Voter's Card" },
    { name: "Driver's License", type: "Driver's License" },
    { name: "International Passport", type: "International Passport" },
    {
      name: "National Identification Number",
      type: "National Identification Number",
    },
  ];

  return (
    <>
      <div className="my-4">
        <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-purple-300 text-purple-900">
          {accountType === "corporate" && "DIRECTOR'S"} IDENTITY INFORMATION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jost">
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Identity Card Type <span className="text-red-500">*</span>
          </h6>
          <div
            className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform"
            onClick={() => setOpenIdentityType(!openIdentityType)}
          >
            <h6 className="text-sm text-black/70">
              {!identityType
                ? "-- Select your Identity Card Type --"
                : identityType.split("")[0].toUpperCase() +
                  identityType.split("").slice(1).join("")}
            </h6>
            <ChevronDown
              className={`w-8 h-5 ml-auto border-l border-black/10 text-black/50 ${
                openIdentityType ? "rotate-180" : ""
              }`}
            />
            {openIdentityType && (
              <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost z-50">
                {identityCardType.map((cardType) => (
                  <div
                    key={cardType.type}
                    className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                    onClick={() => {
                      setIdentityType(cardType.name);
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        identity_card_type: cardType.type,
                      }));
                    }}
                  >
                    {cardType.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </label>

        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            {identityType === "National Identification Number"
              ? "National Identification"
              : "Identity Card"}{" "}
            Number <span className="text-red-500">*</span>
          </h6>
          <input
            type="text"
            onChange={(e) => {
              setOnBoardingData((prevState) => {
                if (!prevState) return prevState;

                const update: any = {
                  ...prevState,
                  identity_card_number: e.target.value,
                };

                // Set NIN field if NIN is selected
                if (identityType === "National Identification Number") {
                  if (
                    accountType === "corporate" ||
                    accountType === "Employee Group Life"
                  ) {
                    update.director_national_identification_number =
                      e.target.value;
                  } else {
                    update.national_identification_number = e.target.value;
                  }
                }

                return update;
              });
            }}
            placeholder={`Enter ${
              accountType !== "corporate"
                ? identityType === "National Identification Number"
                  ? "national identification"
                  : "identity card"
                : identityType === "National Identification Number"
                ? "director's national identification"
                : "director's identity card"
            } number`}
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
      </div>
    </>
  );
};

export default IdentityInfoSection;
