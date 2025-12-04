import SlideDrawer from "@/components/slider-drawer";
import { useEmployee } from "@/hooks/useEmployee";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type IProps = {
  employeeId: number;
  showViewEmployee: boolean;
  setShowViewEmployee: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewEmployee: React.FC<IProps> = ({
  employeeId,
  showViewEmployee,
  setShowViewEmployee,
}) => {
  const { isLoading, error, isError, refetch, data } = useEmployee(
    employeeId,
    "company"
  );

  if (error) {
    toast.error(error.message || "Failed to fetch company details");
  }

  return (
    <SlideDrawer
      open={showViewEmployee}
      onClose={() => setShowViewEmployee(false)}
      title={data ? data!.full_name : "View Employee"}
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
                First Name:{" "}
                <span className="font-medium text-xl">
                  {data.first_name || "Not Set"}
                </span>
              </h2>
              <h2>
                Last Name:{" "}
                <span className="font-medium text-xl">
                  {data.last_name || "Not Set"}
                </span>
              </h2>
              <h2>
                Full Name:{" "}
                <span className="font-medium text-xl">
                  {data.full_name || "Not Set"}
                </span>
              </h2>
              <h2>
                Email:{" "}
                <span className="font-medium text-xl">
                  {data.email || "Not Set"}
                </span>
              </h2>
              <h2>
                Phone Number:{" "}
                <span className="font-medium text-xl">
                  {data.phone || "Not Set"}
                </span>
              </h2>
              <h2>
                Employee Number:{" "}
                <span className="font-medium text-xl">
                  {data.employee_number || "Not Set"}
                </span>
              </h2>
              <h2>
                Department:{" "}
                <span className="font-medium text-xl">
                  {data.department || "Not Set"}
                </span>
              </h2>
              <h2>
                Position:{" "}
                <span className="font-medium text-xl">
                  {data.position || "Not Set"}
                </span>
              </h2>
              <h2>
                Hire Date:{" "}
                <span className="font-medium text-xl">
                  {data.hire_date || "Not Set"}
                </span>
              </h2>
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
          </div> */}
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">
              Employer (Company)
            </h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50"></div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">Role</h2>
            <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
              <div className="space-y-4 p-2 pl-4 rounded-xl bg-sky-50">
                <h2>
                  Role:{" "}
                  <span className="font-medium text-xl">
                    {data.position || "Not Set"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-xl border-muted-foreground shadow-xl">
            <h2 className="font-medium text-xl underline ">
              Documents Uploaded
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
                <span className="font-medium text-xl">
                  {data.employment_status}
                </span>
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

export default ViewEmployee;
