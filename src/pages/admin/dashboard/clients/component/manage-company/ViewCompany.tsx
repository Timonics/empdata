import CompanyDocuments from "@/components/company-details/CompanyDocuments";
import CompanyOverview from "@/components/company-details/CompanyOverview";
import VerificationStatus from "@/components/company-details/VerificationStatus";
import SlideDrawer from "@/components/slider-drawer";
import { useCompany } from "@/hooks/useCompany";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type IProps = {
  companyId: number;
  showViewCompany: boolean;
  setShowViewCompany: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewCompany: React.FC<IProps> = ({
  companyId,
  showViewCompany,
  setShowViewCompany,
}) => {
  const { isLoading, error, isError, refetch, data } = useCompany(companyId);

  if (error) {
    toast.error(error.message || "Failed to fetch company details");
  }

  const [showNav, setShowNav] = useState<
    "" | "Documents" | "Verification Status"
  >("");

  return (
    <SlideDrawer
      open={showViewCompany}
      onClose={() => setShowViewCompany(false)}
      title={data ? data!.name : "View Company"}
    >
      {isLoading && (
        <div className="flex items-center gap-2 h-[300px]">
          <LoaderCircle className="animate-spin" />
          <p className="text-3xl">Loading company…</p>
        </div>
      )}

      {isError && (
        <div className="h-[300px] flex flex-col items-center">
          Company Details Not Found
          <button
            className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col border rounded-xl border-muted-foreground shadow-xl mt-4">
            <div className="border-b-2 pl-6 border-black/5 flex gap-5 items-center">
              {[
                { name: "Overview" },
                { name: "Documents" },
                // { name: "Admin Users" },
                { name: "Verification Status" },
              ].map((nav) => (
                <div
                  onClick={() => {
                    if (nav.name === "Overview") {
                      setShowNav("");
                    } else {
                      setShowNav(
                        nav.name as "Documents" | "Verification Status"
                      );
                    }
                  }}
                  className={`p-4 cursor-pointer jost transition duration-300  ${
                    showNav === nav.name
                      ? "border-b-2 border-sky-600 text-sky-500 font-medium"
                      : showNav === "" && nav.name === "Overview"
                      ? "border-b-2 border-sky-600 text-sky-500 font-medium"
                      : ""
                  }`}
                >
                  {nav.name}
                </div>
              ))}
            </div>
            <div className="p-4 mt-4">
              {showNav === "Documents" ? (
                <CompanyDocuments />
              ) : showNav === "Verification Status" ? (
                <VerificationStatus />
              ) : (
                <CompanyOverview companyData={data} />
              )}
            </div>
          </div>
          {/* <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">Admin Users</h2>
            <div className="space-y-4">
              {data.admins?.map((user) => (
                <div className="flex flex-col p-2 pl-4 gap-2 bg-sky-50 rounded-xl">
                  <h2>
                    Name:{" "}
                    <span className="font-medium text-xl">
                      {user.name || "Not Set"}
                    </span>
                  </h2>
                  <h2>
                    Email:{" "}
                    <span className="font-medium text-xl">
                      {user.email || "Not Set"}
                    </span>
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">
              Company Employees Count
            </h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
              <h2>
                Total Employees:{" "}
                <span className="font-medium text-xl">
                  {data.employees_count === 0
                    ? "No Employees"
                    : data.employees_count}
                </span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">
              Documents Submitted
            </h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
              No Documents Found
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">
              Verification Status
            </h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
              <h2>
                Status:{" "}
                <span className="font-medium text-xl">{data.status}</span>
              </h2>
            </div>
          </div> */}
        </div>
      )}
    </SlideDrawer>
  );
};

export default ViewCompany;
