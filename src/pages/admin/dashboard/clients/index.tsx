import {
  CloudDownload,
  CloudUpload,
  Edit,
  Eye,
  Filter,
  LoaderCircle,
} from "lucide-react";
import React, { useState } from "react";
import AddCorporateClient from "./component/AddCompany";
import { TbSearch } from "react-icons/tb";
import { PaginationDemo } from "@/components/pagination";
import { useCompanies } from "@/hooks/useCompany";
import { toast } from "sonner";
import EditCompany from "./component/manage-company/EditCompany";
import ViewCompany from "./component/manage-company/ViewCompany";
import ResendInvite from "@/components/resend-invite";
import { getStatusColor } from "@/utils/statusColor";

const Clients: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [addClient, setAddClient] = useState(false);
  const [openActionsIndex, setOpenActionsIndex] = useState<number | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  const [showEditCompany, setShowEditCompany] = useState(false);
  const [showViewCompany, setShowViewCompany] = useState(false);
  const [showResendCompanyInvite, setShowResendCompanyInvite] = useState(false);
  // const [showDeleteCompany, setShowDeleteCompany] = useState(false);

  const { data, isLoading, error } = useCompanies();

  if (error) {
    toast.error(error.message || "Failed to load companies");
  }

  const companyFilters = [
    "All",
    "Verified",
    "Active",
    "Invited",
    "Pending",
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
      : data.filter((company) => company.status === activeFilter.toLowerCase())
    : [];

  const companiesElements =
    baseFilter.length !== 0
      ? baseFilter.map((company, index) => (
          <div
            key={company.id}
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 ${
              index === baseFilter.length - 1 && "shadow-md"
            } bg-white items-center outfit text-sm ${
              index === baseFilter.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">{company.name}</p>
            {/* <p className="text-black/80">{company.industry}</p> */}
            <p
              className={`text-black/80 w-fit inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(
                company.status
              )}`}
            >
              {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
            </p>
            <p className="text-black/80">{company.created_at.split("T")[0]}</p>
            <p className="text-black/80">{company.portal_users_count}</p>
            <div className="border-2 border-muted-foreground/50 p-1 w-fit rounded-full flex items-center gap-2">
              <Edit
                size={32}
                className="hover:cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedCompanyId(company.id);
                  setShowEditCompany(true);
                }}
              />
              <Eye
                size={32}
                className="hover:cursor-pointer text-gray-700 hover:text-purple-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedCompanyId(company.id);
                  setShowViewCompany(true);
                }}
              />
              {/* <Trash
                size={30}
                className="hover:cursor-pointer text-gray-700 hover:text-red-500 hover:bg-black/10 p-1.5 rounded-full"
                onClick={() => {
                  setSelectedCompanyId(company.id);
                  // setShowDeleteCompany(true);
                }}
              /> */}
            </div>
          </div>
        ))
      : !isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl shadow-md bg-white">
            <p className="text-3xl">No Company found.</p>
          </div>
        );

  return (
    <div
      onClick={() => {
        openActionsIndex !== null && setOpenActionsIndex(null);
      }}
    >
      <div className="w-full p-4 mt-4">
        <div className="rounded-xl p-4 bg-black/5 shadow-md">
          <div className="space-y-1 w-full">
            <p className="text-[#344054] font-medium">Search for Company</p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-1 pl-2 h-10 rounded-lg border-[1.5px] border-[#D0D5DD] bg-white w-full">
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
      <div className="w-full p-4 flex flex-col-reverse md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1">
          <div className="text-black/50 font-medium flex items-center justify-center gap-2">
            <Filter className="w-5 h-5" />
            Filter By:
          </div>
          <div className="border border-muted-foreground/50 rounded-md flex items-center shadow-md">
            {companyFilters}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center rounded-md gap-2 p-3 px-10 text-white bg-green-400 shadow-lg font-medium hover:scale-105 transition duration-300 ease-in-out">
            <CloudDownload />
            Import
          </button>
          <button className="flex items-center rounded-md gap-2 p-3 px-10 bg-blue-500 text-white shadow-lg font-medium hover:scale-105 transition duration-300 ease-in-out">
            <CloudUpload />
            Export
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="p-4 grid grid-cols-1 md:grid-cols-6 border-2 border-black/10 rounded-t-lg bg-black/5 font-bold">
          <h5 className="col-span-2">Company Name</h5>
          <h5>Status</h5>
          <h5>Created On</h5>
          <h5>Employees</h5>
          <h5> Action</h5>
        </div>
        {isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-lg bg-white shadow-md">
            <LoaderCircle className="animate-spin" />
            <p>Loading clients...</p>
          </div>
        )}
        {companiesElements}
        <div className="mt-4">
          <PaginationDemo />
        </div>
      </div>

      <hr className="border border-black/10 my-4" />

      {addClient && <AddCorporateClient setAddClient={setAddClient} />}
      {showEditCompany && (
        <EditCompany
          companyId={selectedCompanyId!}
          showEditCompany={showEditCompany}
          setShowEditCompany={setShowEditCompany}
        />
      )}
      {showViewCompany && (
        <ViewCompany
          companyId={selectedCompanyId!}
          showViewCompany={showViewCompany}
          setShowViewCompany={setShowViewCompany}
        />
      )}
      {showResendCompanyInvite && (
        <ResendInvite
          portalUserId={selectedCompanyId!}
          setShowResendPortalUserInvite={setShowResendCompanyInvite}
        />
      )}
    </div>
  );
};

export default Clients;
