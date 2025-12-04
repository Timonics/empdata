import SlideDrawer from "@/components/slider-drawer";
import { useEmployee } from "@/hooks/useEmployee";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type IProps = {
  employeeId: number;
  showEditEmployee: boolean;
  setShowEditEmployee: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditEmployee: React.FC<IProps> = ({
  employeeId,
  showEditEmployee,
  setShowEditEmployee,
}) => {
  const { isLoading, error, isError, refetch, data } = useEmployee(
    employeeId,
    "company"
  );

  if (error) {
    toast.error(error.message || "Failed to fetch employee details");
  }

  return (
    <SlideDrawer
      open={showEditEmployee}
      onClose={() => setShowEditEmployee(false)}
      title="Edit Employee"
    >
      {isLoading && (
        <div className="flex items-center gap-2 h-[300px]">
          <LoaderCircle className="animate-spin" />
          <p className="text-3xl">Loading employee</p>
        </div>
      )}

      {isError && (
        <div className="h-[300px] flex flex-col items-center">
          Employee Details Not Found
          <button
            className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-1">
            <p>Employee First Name</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.first_name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Employee Last Name</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.last_name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Employee Full Name</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.full_name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Employee Email</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Phone Number</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.phone || "Phone Number"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Employee Number</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.employee_number || "Employee Number"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Department</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.department || "Department"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Position</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.position || "Position"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Hire Date</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.hire_date || "Hire Date"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Employment Status</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.employment_status}
            />
          </div>
        </div>
      )}
      {!isLoading && !isError && data && (
        <button className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl">
          Submit
        </button>
      )}
    </SlideDrawer>
  );
};

export default EditEmployee;
