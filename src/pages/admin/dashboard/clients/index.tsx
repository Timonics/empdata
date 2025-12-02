import { Download, Edit, Eye, LoaderCircle, Trash } from "lucide-react";
import React, { useState } from "react";
import AddCorporateClient from "./component/AddCorporateClient";
import { TbSearch } from "react-icons/tb";
import { PaginationDemo } from "@/components/pagination";
import { useCompanies } from "@/hooks/useCompany";
import { toast } from "sonner";

const Clients: React.FC = () => {
  const [addClient, setAddClient] = useState(false);
  const [openActionsIndex, setOpenActionsIndex] = useState<number | null>(null);

  const { data, isLoading, error } = useCompanies();

  if (error) {
    toast.error(error.message || "Failed to load companies");
  }

  return (
    <div
      onClick={() => {
        openActionsIndex !== null && setOpenActionsIndex(null);
      }}
    >
      <div className="w-full p-4 mt-4">
        <div className="rounded-xl p-4 bg-black/5">
          <div className="space-y-1 w-full">
            <p className="text-[#344054] font-medium">Search for Company</p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-1 pl-2 h-10 rounded-lg border-[1.5px] border-[#D0D5DD] poppins bg-white md:w-2/3 w-full">
                <TbSearch className="h-full w-5 text-sm text-black/30" />
                <input
                  placeholder="Search"
                  className="w-full pr-4 h-10 outline-none placeholder:text-sm placeholder:font-medium"
                  name="departmentSearchTerm"
                />
              </div>
              <div className="flex bg-sky-500 gap-2 rounded-full items-center py-2 px-1 poppins justify-center text-white md:w-1/3 w-full">
                <Download />
                <p className="text-sm font-medium">Download CSV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-black/10 my-4" />
      <div className="flex flex-col p-4">
        <div className="p-4 grid grid-cols-1 md:grid-cols-6 border-2 border-black/10 rounded-t-xl bg-black/5 font-bold">
          <h5 className="col-span-2">Company Name</h5>
          {/* <h5>Industry</h5> */}
          <h5>Status</h5>
          <h5>Created On</h5>
          <h5>Employees</h5>
          <h5> Action</h5>
        </div>
        {isLoading && (
          <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 text-3xl border-b-2 border-black/10 rounded-b-xl">
            <LoaderCircle className="animate-spin" />
            <p>Loading clients...</p>
          </div>
        )}
        {data
          ? data.map((company, index) => (
              <div
                className={`px-4 py-3 grid grid-cols-1 md:grid-cols-6 border-x-2 border-b-2 border-black/10 outfit text-sm ${
                  index === data.length - 1 && "rounded-b-xl"
                }`}
              >
                <p className="col-span-2 text-black/80">{company.name}</p>
                {/* <p className="text-black/80">{company.industry}</p> */}
                <p className="text-black/80">{company.status}</p>
                <p className="text-black/80">{company.created_at}</p>
                <p className="text-black/80">{company.portal_users_count}</p>
                <div className="border-2 border-muted-foreground/50 p-1 w-fit rounded-full flex items-center gap-1">
                  <Edit
                    size={30}
                    className="hover:cursor-pointer hover:text-blue-500 hover:bg-black/10 p-1.5 rounded-full"
                  />
                  <Eye
                    size={30}
                    className="hover:cursor-pointer hover:text-purple-500 hover:bg-black/10 p-1.5 rounded-full"
                  />
                  <Trash
                    size={30}
                    className="hover:cursor-pointer hover:text-red-500 hover:bg-black/10 p-1.5 rounded-full"
                  />
                </div>
              </div>
            ))
          : !isLoading && (
              <div className="h-[300px] flex w-full gap-2 items-center justify-center border border-t-0 border-x-2 border-b-2 border-black/10 rounded-b-xl">
                <p className="text-3xl">No Company found.</p>
              </div>
            )}
        <div className="mt-2">
          <PaginationDemo />
        </div>
      </div>
      <hr className="border border-black/10 my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        {[
          { name: "Add Corporate Client" },
          { name: "Activate/Deactivate" },
          { name: "Assign HR Managers" },
          { name: "View Employees" },
        ].map((item, index) => (
          <div
            onClick={() => {
              if (index === 0) {
                setAddClient(true);
              }
            }}
            className="p-6 rounded-xl shadow-xl bg-linear-to-br from-gray-800 to-black text-gray-400 font-medium hover:scale-105 transition duration-300 ease-in-out hover:text-sky-400"
          >
            <h4 className="text-center">{item.name}</h4>
          </div>
        ))}
      </div>
      {addClient && <AddCorporateClient setAddClient={setAddClient} />}
    </div>
  );
};

export default Clients;
