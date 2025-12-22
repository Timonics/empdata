// components/PolicyPlanSelector.tsx
import React from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  companyPolicyPlan,
  individualPolicyPlan,
} from "@/lib/onboarding/policy_plan";
import { useCompaniesOnGroupLife } from "@/hooks/useGroupLifeRegistrations";

interface PolicyPlanSelectorProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  selectedPlan: string;
  openPolicyPlan: boolean;
  setSelectedPlan: (plan: string) => void;
  setOpenPolicyPlan: (open: boolean) => void;
}

const PolicyPlanSelector: React.FC<PolicyPlanSelectorProps> = ({
  accountType,
  selectedPlan,
  openPolicyPlan,
  setSelectedPlan,
  setOpenPolicyPlan,
}) => {
  const { isLoading, data } = useCompaniesOnGroupLife();

  const companiesElements =
    data && data.length > 0
      ? data.map((company: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              setSelectedPlan(company.name);
            }}
            className={`text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3 ${
              index === data.length ? "border-none" : "border-b"
            }`}
          >
            {company.name}
          </div>
        ))
      : !isLoading && (
          <div className="flex gap-2 h-[200px] items-center justify-center w-full">
            No Companies found
          </div>
        );

  return (
    <label className="space-y-1">
      <h6 className="text-black/75 text-sm">
        {accountType !== "Employee Group Life" ? "Policy Plan" : "Company"}
      </h6>
      <div
        className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          setOpenPolicyPlan(!openPolicyPlan);
        }}
      >
        <h6
          className={`text-sm ${
            selectedPlan ? "text-black/70" : "text-black/50"
          }`}
        >
          {!selectedPlan
            ? `Select your ${
                accountType !== "Employee Group Life"
                  ? accountType!.split("")[0].toUpperCase() +
                    accountType!.split("").slice(1).join("")
                  : "Company"
              } ${
                accountType === "Employee Group Life"
                  ? "registered on Group Life"
                  : "Policy Plan"
              }`
            : selectedPlan}
        </h6>
        <ChevronDown
          className={`w-8 h-5 ml-auto text-black/50 border-l border-black/10 ${
            openPolicyPlan ? "rotate-180" : ""
          }`}
        />
        {openPolicyPlan && accountType !== "Employee Group Life" && (
          <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col max-h-[250px] overflow-auto border-black/10 bg-white shadow-sm jost">
            {accountType === "individual" &&
              individualPolicyPlan.map((policy_plan, index) => (
                <div
                  key={index}
                  className={`text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3 ${
                    index === individualPolicyPlan.length
                      ? "border-none"
                      : "border-b"
                  }`}
                  onClick={() => {
                    setSelectedPlan(policy_plan.name);
                  }}
                >
                  {policy_plan.name}
                </div>
              ))}
            {accountType === "corporate" &&
              companyPolicyPlan.map((policy_plan, index) => (
                <div
                  key={index}
                  className={`text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3 ${
                    index === individualPolicyPlan.length
                      ? "border-none"
                      : "border-b"
                  }`}
                  onClick={() => {
                    setSelectedPlan(policy_plan.name);
                  }}
                >
                  {policy_plan.name}
                </div>
              ))}
          </div>
        )}
        {openPolicyPlan && accountType === "Employee Group Life" && (
          <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col max-h-[250px] overflow-auto border-black/10 bg-white shadow-sm jost">
            {isLoading && (
              <div className="flex gap-2 h-[200px] items-center justify-center w-full">
                <Loader2 className="animate-spin" />
                Loading companies
              </div>
            )}
            {companiesElements}
          </div>
        )}
      </div>
    </label>
  );
};

export default PolicyPlanSelector;
