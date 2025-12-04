import SlideDrawer from "@/components/slider-drawer";
import { useCompany } from "@/hooks/useCompany";
import { LoaderCircle } from "lucide-react";
import React from "react";
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
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">Company Profile</h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
              <h2>
                Name:{" "}
                <span className="font-medium text-xl">
                  {data.name || "Not Set"}
                </span>
              </h2>
              <h2>
                Email:{" "}
                <span className="font-medium text-xl">
                  {data.email || "Not Set"}
                </span>
              </h2>
              <h2>
                RC Number:{" "}
                <span className="font-medium text-xl">
                  {data.rc_number || "Not Set"}
                </span>
              </h2>
              <h2>
                Address:{" "}
                <span className="font-medium text-xl">
                  {data.address || "Not Set"}
                </span>
              </h2>
              <h2>
                City:{" "}
                <span className="font-medium text-xl">
                  {data.city || "Not Set"}
                </span>
              </h2>
              <h2>
                State:{" "}
                <span className="font-medium text-xl">
                  {data.state || "Not Set"}
                </span>
              </h2>
              <h2>
                Country:{" "}
                <span className="font-medium text-xl">
                  {data.country || "Not Set"}
                </span>
              </h2>
              <h2>
                Insurance Type:{" "}
                <span className="font-medium text-xl">
                  {data.insurance_type || "Not Set"}
                </span>
              </h2>
              <h2>
                Registration Date:{" "}
                <span className="font-medium text-xl">
                  {data.registration_date || "Not Set"}
                </span>
              </h2>
              <h2>
                License Number:{" "}
                <span className="font-medium text-xl">
                  {data.license_number || "Not Set"}
                </span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
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
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50"></div>
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
          </div>
        </div>
      )}
      {!isLoading && !isError && data && (
        <button className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl">
          Download CSV
        </button>
      )}
    </SlideDrawer>
  );
};

export default ViewCompany;
