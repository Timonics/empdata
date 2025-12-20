import React from "react";
import { ChevronDown } from "lucide-react";

interface AccountTypeSelectorProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  openAccountType: boolean;
  setAccountType: (
    type: "individual" | "corporate" | "Employee Group Life" | null
  ) => void;
  setOpenAccountType: (open: boolean) => void;
  setOpenPolicyPlan: (open: boolean) => void;
  setSelectedPlan: (plan: string) => void;
  setOnBoardingData: React.Dispatch<React.SetStateAction<any>>;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  accountType,
  openAccountType,
  setAccountType,
  setOpenAccountType,
  setOpenPolicyPlan,
  setSelectedPlan,
  setOnBoardingData,
}) => {
  return (
    <label className="space-y-1">
      <h6 className="text-black/75 text-sm">Account Type</h6>
      <div
        className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-4 relative transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          setOpenAccountType(!openAccountType);
          setOpenPolicyPlan(false);
          setSelectedPlan("");
        }}
      >
        <h6
          className={`text-sm ${
            accountType ? "text-black/70" : "text-black/50"
          }`}
        >
          {!accountType
            ? "Select your Account Type"
            : accountType.split("")[0].toUpperCase() +
              accountType.split("").slice(1).join("") +
              " Account"}
        </h6>
        <ChevronDown
          className={`w-8 h-5 ml-auto border-l border-black/10 text-black/50 ${
            openAccountType ? "rotate-180" : ""
          }`}
        />
        {openAccountType && (
          <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost z-50">
            <div
              className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
              onClick={() => {
                setAccountType("individual");
                setOnBoardingData(null);
              }}
            >
              Individual Account
            </div>
            <div
              className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
              onClick={() => {
                setAccountType("corporate");
                setOnBoardingData(null);
              }}
            >
              Corporate Account
            </div>
            <div
              className="text-sm p-2 px-4 hover:bg-black/3"
              onClick={() => {
                setAccountType("Employee Group Life");
                setOnBoardingData(null);
              }}
            >
              Employee Group Life Account
            </div>
          </div>
        )}
      </div>
    </label>
  );
};

export default AccountTypeSelector;
