import { PaginationDemo } from "@/components/pagination";
import { useEmployees } from "@/hooks/useEmployee";
import {
  CloudDownload,
  Edit,
  Eye,
  LoaderCircle,
  Plus,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { toast } from "sonner";
import AddEmployee from "./component/AddEmployee";
import EditEmployee from "./component/manage-employee/EditEmployee";
import ViewEmployee from "./component/manage-employee/ViewEmployee";

const CompanyEmployees: React.FC = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { isLoading, data, error } = useEmployees("company");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showViewEmployee, setShowViewEmployee] = useState(false);
  // const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);

  if (error) {
    toast.error(error.message || "Failed to load companies");
  }

  const employeeFilters = ["All", "Active", "Pending", "Inactive"].map(
    (filter) => (
      <button
        key={filter}
        className={`not-last:border-r first:rounded-l-lg last:rounded-r-lg border-muted-foreground/50 py-2 px-4 hover:bg-muted-foreground/10 ${
          activeFilter === filter ? "bg-sky-100 hover:bg-sky-100" : ""
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
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-5 border-x-2 border-b-2 border-black/10 items-center outfit text-sm ${
              index === baseFilter.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">{employee.full_name}</p>
            <p className="text-black/80">
              {employee.employment_status.charAt(0).toUpperCase() +
                employee.employment_status.slice(1)}
            </p>
            <p className="text-black/80">{employee.email}</p>
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
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl">
            <p className="text-3xl">No Employee found.</p>
          </div>
        );

  return (
    <div>
      <div className="w-full p-4 mt-4">
        <div className="rounded-xl p-4 bg-black/5">
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
      <hr className="border border-black/10 my-4" />
      <div className="w-full p-4 flex items-center justify-between">
        <div className="border border-muted-foreground/50 rounded-lg flex items-center">
          {employeeFilters}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAddEmployee(true)}
            className="flex p-4 rounded-lg items-center gap-2 shadow-xl bg-linear-to-br from-gray-800 to-black text-gray-400 font-medium hover:scale-105 transition duration-300 ease-in-out hover:text-sky-400"
          >
            <Plus />
            Add New Employee
          </button>
          <button className="flex items-center gap-2 p-4 rounded-full px-6 bg-sky-300 shadow-xl">
            <CloudDownload />
            Export
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default CompanyEmployees;
