import { PaginationDemo } from "@/components/pagination";
import { useEmployees } from "@/hooks/useEmployee";
import {
  CloudDownload,
  Edit,
  Eye,
  Filter,
  LoaderCircle,
  Trash,
  UserPlus,
} from "lucide-react";
import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { toast } from "sonner";
import AddEmployee from "./component/AddEmployee";
import EditEmployee from "./component/manage-employee/EditEmployee";
import ViewEmployee from "./component/manage-employee/ViewEmployee";
import ResendInvite from "@/components/resend-invite";
import { getStatusColor } from "@/utils/statusColor";

const Employees: React.FC = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { isLoading, data, error } = useEmployees("admin");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  if (error) {
    toast.error(error.message || "Failed to load employees");
  }

  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showViewEmployee, setShowViewEmployee] = useState(false);
  const [showResendEmployeeInvite, setShowResendEmployeeInvite] =
    useState(false);

  // const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);

  const employeeFilters = ["All", "Active", "Pending", "Inactive"].map(
    (filter) => (
      <button
        key={filter}
        className={`not-last:border-r first:rounded-l-md last:rounded-r-md border-muted-foreground/50 py-2 px-4 hover:bg-muted-foreground/10 text-sm ${
          activeFilter === filter ? "bg-sky-100 hover:bg-sky-100" : "bg-white"
        }`}
        onClick={() => setActiveFilter(filter)}
      >
        {filter}
      </button>
    )
  );

  const baseFilter = data
    ? activeFilter === "All"
      ? data
      : data.filter(
          (employee) =>
            employee.employment_status === activeFilter.toLowerCase()
        )
    : [];

  const employeesElements =
    baseFilter.length !== 0
      ? baseFilter.map((employee, index) => (
          <div
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10  ${
              index === baseFilter.length - 1 && "shadow-md"
            } bg-white items-center outfit text-sm ${
              index === baseFilter.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">{employee.full_name}</p>
            <p
              className={`text-black/80 w-fit inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(
                employee.employment_status
              )}`}
            >
              {employee.employment_status.charAt(0).toUpperCase() + employee.employment_status.slice(1)}
            </p>
            <p className="text-black/80 text-xs">{employee.email}</p>
            <p className="text-black/80">----</p>
            <div className="border-2 border-muted-foreground/50 p-1 w-fit rounded-full flex items-center gap-1">
              <Edit
                size={30}
                className="hover:cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedEmployeeId(employee.id);
                  setShowEditEmployee(true);
                }}
              />
              <Eye
                size={30}
                className="hover:cursor-pointer text-gray-700 hover:text-purple-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedEmployeeId(employee.id);
                  setShowViewEmployee(true);
                }}
              />
              <UserPlus
                size={30}
                className="hover:cursor-pointer text-gray-700 hover:text-orange-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedEmployeeId(employee.id);
                  setShowResendEmployeeInvite(true);
                }}
              />
              <Trash
                size={30}
                className="hover:cursor-pointer text-gray-700 hover:text-red-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedEmployeeId(employee.id);
                  // setShowDeleteCompany(true);
                }}
              />
            </div>
          </div>
        ))
      : !isLoading && (
          <div className="h-[300px] bg-white shadow-md flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl">
            <p className="text-3xl">No Employee found.</p>
          </div>
        );

  return (
    <div>
      <div className="w-full p-4 mt-4">
        <div className="rounded-lg shadow-md p-4 bg-black/5">
          <div className="space-y-1 w-full">
            <p className="text-[#344054] font-medium">Search for Employee</p>
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

      <hr className="border border-black/5 my-4" />

      <div className="w-full p-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-black/50 font-medium flex items-center justify-center gap-2">
            <Filter className="w-5 h-5" />
            Filter By:
          </div>
          <div className="border shadow-md border-muted-foreground/50 rounded-md flex items-center">
            {employeeFilters}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <button
            onClick={() => setAddEmployee(true)}
            className="flex p-4 rounded-lg items-center gap-2 shadow-lg bg-blue-500 font-semibold text-white hover:bg-blue-700 transition duration-300"
          >
            <Plus />
            Add New Employee
          </button> */}
          <button className="flex items-center rounded-md gap-2 p-3 px-10 bg-blue-500 text-white shadow-lg font-medium hover:scale-105 transition duration-300 ease-in-out">
            <CloudDownload />
            Export
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="p-4 grid grid-cols-1 md:grid-cols-6 border-2 border-black/10 rounded-t-xl bg-black/5 font-bold">
          <h5 className="col-span-2">Employee Name</h5>
          <h5>Status</h5>
          <h5>Email</h5>
          <h5>Company</h5>
          <h5> Action</h5>
        </div>
        {isLoading && (
          <div className="h-[300px] shadow-md bg-white flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-xl">
            <LoaderCircle className="animate-spin" />
            <p>Loading Employees...</p>
          </div>
        )}
        {employeesElements}
        <div className="mt-4">
          <PaginationDemo />
        </div>
      </div>

      <hr className="border border-black/5 my-4" />

      {addEmployee && <AddEmployee setAddEmployee={setAddEmployee} />}
      {showEditEmployee && (
        <EditEmployee
          employeeId={selectedEmployeeId!}
          showEditEmployee={showEditEmployee}
          setShowEditEmployee={setShowEditEmployee}
        />
      )}
      {showViewEmployee && (
        <ViewEmployee
          employeeId={selectedEmployeeId!}
          showViewEmployee={showViewEmployee}
          setShowViewEmployee={setShowViewEmployee}
        />
      )}
      {showResendEmployeeInvite && (
        <ResendInvite
          portalUserId={selectedEmployeeId!}
          setShowResendPortalUserInvite={setShowResendEmployeeInvite}
        />
      )}
    </div>
  );
};

export default Employees;
