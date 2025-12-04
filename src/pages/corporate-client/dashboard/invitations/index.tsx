import { PaginationDemo } from "@/components/pagination";
import { useEmployees } from "@/hooks/useEmployee";
import { LoaderCircle, UserPlus } from "lucide-react";
import React from "react";
import { TbSearch } from "react-icons/tb";
import { toast } from "sonner";

const Invitations: React.FC = () => {
  const { isLoading, data, error } = useEmployees("company");

  if (error) {
    toast.error(error.message || "Failed to load companies");
  }

  const employeesElements =
    data && data.length !== 0
      ? data.map((employee, index) => (
          <div
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-5 border-x-2 border-b-2 border-black/10 items-center outfit text-sm ${
              index === data.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">{employee.full_name}</p>
            <p className="text-black/80 text-sm">
              {employee.employment_status.charAt(0).toUpperCase() +
                employee.employment_status.slice(1)}
            </p>
            <p className="text-black/80 text-xs">{employee.email}</p>
            <div className="border-2 border-muted-foreground/50 p-1 px-2 w-fit rounded-full flex items-center gap-1 hover:text-blue-500 hover:cursor-pointer  text-gray-700 hover:bg-black/10">
              <UserPlus
                size={30}
                className="p-1.5 rounded-full"
                onClick={() => {}}
              />
              Resend Invite
            </div>
          </div>
        ))
      : !isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl">
            <p className="text-3xl">No Employee found.</p>
          </div>
        );

  return (
    <div>
      <div className="w-full p-4 mt-4">
        <div className="rounded-xl p-4 bg-black/5">
          <div className="space-y-1 w-full">
            <p className="text-[#344054] font-medium">
              Search for Employee Invitations
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-1 pl-2 h-10 rounded-lg border-[1.5px] border-[#D0D5DD] poppins bg-white w-full">
                <TbSearch className="h-full w-5 text-sm text-black/30" />
                <input
                  placeholder="Search"
                  className="w-full pr-4 h-10 outline-none placeholder:text-sm placeholder:font-medium"
                  name="departmentSearchTerm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-black/10 my-4" />

      <div className="flex flex-col p-4">
        <div className="p-4 grid grid-cols-1 md:grid-cols-5 border-2 border-black/10 rounded-t-xl bg-black/5 font-bold">
          <h5 className="col-span-2">Employee Name</h5>
          <h5>Status</h5>
          <h5>Email</h5>
          <h5> Action</h5>
        </div>
        {isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-xl">
            <LoaderCircle className="animate-spin" />
            <p>Loading Employees...</p>
          </div>
        )}
        {employeesElements}
        <div className="mt-4">
          <PaginationDemo />
        </div>
      </div>

      <hr className="border border-black/10 my-4" />
    </div>
  );
};

export default Invitations;
