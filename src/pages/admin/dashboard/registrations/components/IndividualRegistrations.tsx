import { PaginationDemo } from "@/components/pagination";
import ResendInvite from "@/components/resend-invite";
import { Button } from "@/components/ui/button";
import { useGroupLifeRegistrations } from "@/hooks/useGroupLifeRegistrations";
import { dashboardData } from "@/lib/grouplife/dashboard";
import type { RootState } from "@/store/store";
import type { IndividualOnboarding } from "@/types/onboarding.type";
import {
  getDisplayStatus,
  getActions,
} from "@/utils/registrations.helper";
import { Check, Eye, X, UserPlus, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const IndividualRegistrations: React.FC = () => {
  // const companiesGroupLifeElements = [].map((company, index) => (
  //   <div
  //     key={company.id}
  //     className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 ${
  //       index === baseFilter.length - 1 && "shadow-md"
  //     } bg-white items-center outfit text-sm ${
  //       index === baseFilter.length - 1 && "rounded-b-xl"
  //     }`}
  //   >
  //     <p className="col-span-2 text-black/80">{company.name}</p>
  //     {/* <p className="text-black/80">{company.industry}</p> */}
  //     <p
  //       className={`text-black/80 w-fit inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(
  //         company.status
  //       )}`}
  //     >
  //       {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
  //     </p>
  //     <p className="text-black/80">{company.created_at.split("T")[0]}</p>
  //     <p className="text-black/80">{company.portal_users_count}</p>
  //     <div className="border-2 border-muted-foreground/50 p-1 w-fit rounded-full flex items-center gap-1">
  //       <Edit
  //         size={30}
  //         className="hover:cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-black/10 p-1.5 rounded-full"
  //         onClick={() => {
  //           setSelectedCompanyId(company.id);
  //           setShowEditCompany(true);
  //         }}
  //       />
  //       <Eye
  //         size={30}
  //         className="hover:cursor-pointer text-gray-700 hover:text-purple-500 hover:bg-black/10 p-1.5 rounded-full"
  //         onClick={() => {
  //           setSelectedCompanyId(company.id);
  //           setShowViewCompany(true);
  //         }}
  //       />
  //       <UserPlus
  //         size={30}
  //         className="hover:cursor-pointer text-gray-700 hover:text-orange-500 hover:bg-black/10 p-1.5 rounded-full"
  //         onClick={() => {
  //           setSelectedCompanyId(company.id);
  //           setShowResendCompanyInvite(true);
  //         }}
  //       />
  //       <Trash
  //         size={30}
  //         className="hover:cursor-pointer text-gray-700 hover:text-red-500 hover:bg-black/10 p-1.5 rounded-full"
  //         onClick={() => {
  //           setSelectedCompanyId(company.id);
  //           // setShowDeleteCompany(true);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  // const dispatch: AppDispatch = useDispatch();
  const [showSendInvite, setShowSendInvite] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  // const [activeFilter, setActiveFilter] = useState<string>("All");
  const { isLoading } = useGroupLifeRegistrations();

  const data = useSelector((state: RootState) =>
    state.registrations.records.filter((r) => r.type === "individual")
  );

  const companiesGroupLifeElements =
    data.length !== 0 ? (
      data.map((item, index) => {
        const displayStatus = getDisplayStatus(item.data);
        const actions = getActions(item.data);
        return (
          <div
            key={item.id}
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 ${
              index === data.length - 1 && "shadow-md"
            } bg-white items-center outfit text-sm ${
              index === data.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">
              {(item.data as IndividualOnboarding).first_name}{" "}
              {(item.data as IndividualOnboarding).last_name}
            </p>
            <p className=" text-black/80 capitalize">{displayStatus}</p>
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
                    setSelectedCompanyId(item.id);
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
                <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-500 text-white">
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
        <p className="text-3xl">No Employee registrations found.</p>{" "}
      </div>
    );

  return (
    <div className="p-6">
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.map((data) => {
          const Icon = data.icon;
          return (
            <div
              key={data.name}
              className={`bg-linear-to-br ${data.bgColor} border ${data.borderColor} rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 py-4 flex flex-col gap-1 border-2 border-black/10`}
            >
              <div className="flex flex-col font-medium text-black/50 items-start gap-2">
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="pointer-events-none"
                >
                  <Icon className="text-sky-400" />
                </Button>
                <p className="">{data.name}</p>
              </div>
              <h6 className="font-semibold text-2xl text-sky-400">
                {data.amount}
              </h6>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col mt-25">
        <h2 className="text-3xl">Individual Registrations</h2>
        <div className="p-4 grid grid-cols-1 mt-4 md:grid-cols-6 border-2 border-black/10 rounded-t-lg bg-black/5 font-bold">
          <h5 className="col-span-2">Individual Name</h5>
          <h5>Status</h5>
          <h5>Created On</h5>
          <h5>Company</h5>
          <h5> Action</h5>
        </div>
        {isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-lg bg-white shadow-md">
            <LoaderCircle className="animate-spin" />
            <p>Loading clients...</p>
          </div>
        )}
        {companiesGroupLifeElements}
        <div className="mt-4">
          <PaginationDemo />
        </div>
      </div>

      {showSendInvite && (
        <ResendInvite
          portalUserId={selectedCompanyId!}
          setShowResendPortalUserInvite={setShowSendInvite}
        />
      )}
    </div>
  );
};

export default IndividualRegistrations;
