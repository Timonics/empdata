import { Check, Eye, Filter, LoaderCircle, UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import { PaginationDemo } from "../../../../../../components/pagination";
import { useGroupLifeRegistrations } from "@/hooks/useGroupLifeRegistrations";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import type { IndividualOnboarding } from "@/types/onboarding.type";
import { updateRegistrationStatus } from "@/store/slices/onboarding.slice";
import { getActions, getDisplayStatus } from "@/utils/registrations.helper";
import ResendInvite from "../../../../../../components/resend-invite";
import { getStatusColor } from "@/utils/statusColor";
import ViewEmployee from "../../../employees/component/manage-employee/ViewEmployee";

const EmployeeGroupLife: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showSendInvite, setShowSendInvite] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const { isLoading } = useGroupLifeRegistrations();

  const data = useSelector((state: RootState) =>
    state.registrations.records.filter((r) => r.type === "individual")
  );

  const companyFilters = [
    "All",
    "Verified",
    "Active",
    "Invited",
    "Pending",
    "Approved",
    "Rejected",
  ].map((filter) => (
    <button
      key={filter}
      className={`not-last:border-r first:rounded-l-lg last:rounded-r-lg border-muted-foreground/50 text-sm py-2 px-4 hover:bg-muted-foreground/10 ${
        activeFilter === filter ? "bg-sky-100 hover:bg-sky-100" : "bg-white"
      }`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ));

  const baseFilter = data
    ? activeFilter === "All"
      ? data
      : data
          .filter((item) => item.type === "company")
          .filter(
            (company) => company.data.status === activeFilter.toLowerCase()
          )
    : [];

  const filteredPendingReg = data.filter(
    (item) => item.data.status === "pending-approval"
  );

  const pending =
    filteredPendingReg.length !== 0 ? (
      filteredPendingReg.map((item, index) => {
        // const data = item.data as CompanyGroupLifeOnboarding;
        return (
          <div
            key={item.id}
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 ${
              index === filteredPendingReg.length - 1 && "shadow-md"
            } bg-white items-center outfit text-sm ${
              index === filteredPendingReg.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">
              {(item.data as IndividualOnboarding).first_name}{" "}
              {(item.data as IndividualOnboarding).last_name}
            </p>
            <p className=" text-black/80">pending</p>
            <p className=" text-black/80">--</p>
            <div className="col-span-2 flex items-center gap-2 font-medium">
              <button
                onClick={() =>
                  dispatch(
                    updateRegistrationStatus({
                      id: item.id,
                      updates: {
                        status: "approved",
                      },
                    })
                  )
                }
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-green-500 text-white"
              >
                <Check size={15} />
                Approve
              </button>

              <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-500 text-white">
                <Eye size={15} />
                View
              </button>

              <button
                onClick={() =>
                  dispatch(
                    updateRegistrationStatus({
                      id: item.id,
                      updates: {
                        status: "rejected",
                      },
                    })
                  )
                }
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-red-500 text-white"
              >
                <X size={15} />
                Reject
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl shadow-md bg-white">
        <p className="text-3xl">No pending registration found.</p>
      </div>
    );

  const employeeGroupLifeElements =
    baseFilter.length !== 0 ? (
      baseFilter.map((employee, index) => {
        const displayStatus = getDisplayStatus(employee.data);
        const actions = getActions(employee.data);
        return (
          <div
            key={employee.id}
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 ${
              index === data.length - 1 && "shadow-md"
            } bg-white items-center outfit text-sm ${
              index === data.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">
              {(employee.data as IndividualOnboarding).first_name}{" "}
              {(employee.data as IndividualOnboarding).last_name}
            </p>
            <p
              className={`text-black/80 w-fit border capitalize inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(
                displayStatus
              )}`}
            >
              {displayStatus}
            </p>
            <p className=" text-black/80">--</p>
            <div className="flex items-center gap-2 font-medium">
              {actions.canApprove && (
                <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-green-500 text-white">
                  <Check size={15} />
                  Approve
                </button>
              )}

              {actions.canReject && (
                <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-red-500 text-white">
                  <X size={15} />
                  Reject
                </button>
              )}

              {actions.canSendInvite && (
                <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-purple-500 text-white">
                  <UserPlus size={15} />
                  Send Invite
                </button>
              )}

              {actions.canResendInvite && (
                <button
                  onClick={() => {
                    setShowSendInvite(true);
                    setSelectedEmployeeId(employee.id);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-purple-500 text-white"
                >
                  <UserPlus size={15} />
                  Resend Invite
                </button>
              )}

              {actions.canVerify && (
                <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-indigo-500 text-white">
                  Verify
                </button>
              )}

              {actions.canView && (
                <button
                  onClick={() => {
                    setViewEmployee(true);
                    setSelectedEmployeeId(employee.id);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-500 text-white"
                >
                  <Eye size={15} />
                  View
                </button>
              )}
            </div>
          </div>
        );
      })
    ) : (
      <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl shadow-md bg-white">
        <p className="text-3xl">
          No{" "}
          {activeFilter.toLowerCase() === "all"
            ? ""
            : activeFilter.toLowerCase()}{" "}
          registrations found.
        </p>{" "}
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl">Pending Registrations</h2>
      <div className="p-4 mt-4 grid grid-cols-1 md:grid-cols-6 border-2 border-black/10 rounded-t-lg bg-black/5 font-bold">
        <h5 className="col-span-2">Employee Name</h5>
        <h5>Status</h5>
        <h5>Created On</h5>
        <h5 className="col-span-2"> Action</h5>
      </div>
      {isLoading ? (
        <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-lg bg-white shadow-md">
          <LoaderCircle className="animate-spin" />
          <p>Loading clients...</p>
        </div>
      ) : (
        pending
      )}
      <div className="mt-4">
        <PaginationDemo />
      </div>

      <h2 className="text-2xl mt-20">Employee Registrations</h2>
      <div className="space-y-1  w-fit my-8">
        <div className="text-black/50 font-medium flex items-center justify-center gap-2">
          <Filter className="w-5 h-5" />
          Filter By:
        </div>
        <div className="border border-muted-foreground/50 rounded-md flex items-center shadow-md">
          {companyFilters}
        </div>
      </div>
      <div className="p-4 mt-4 grid grid-cols-1 md:grid-cols-6 border-2 border-black/10 rounded-t-lg bg-black/5 font-bold">
        <h5 className="col-span-2">Employee Name</h5>
        <h5>Status</h5>
        <h5>Created On</h5>
        <h5> Action</h5>
      </div>
      {isLoading ? (
        <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-lg bg-white shadow-md">
          <LoaderCircle className="animate-spin" />
          <p>Loading emplyees...</p>
        </div>
      ) : (
        employeeGroupLifeElements
      )}
      <div className="mt-4">
        <PaginationDemo />
      </div>

      {showSendInvite && (
        <ResendInvite
          portalUserId={selectedEmployeeId!}
          setShowResendPortalUserInvite={setShowSendInvite}
        />
      )}
      {viewEmployee && (
        <ViewEmployee
          employeeId={selectedEmployeeId!}
          showViewEmployee={viewEmployee}
          setShowViewEmployee={setViewEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeGroupLife;
