import { Download, Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { clientsData } from "@/lib/admin/clientsData";
import AddCorporateClient from "./component/AddCorporateClient";
import { TbSearch } from "react-icons/tb";
import { PaginationDemo } from "@/components/pagination";

const Clients: React.FC = () => {
  const [addClient, setAddClient] = useState(false);
  const [openActionsIndex, setOpenActionsIndex] = useState<number | null>(null);
  return (
    <div>
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
        <div className="p-4 grid grid-cols-1 md:grid-cols-7 border-2 border-black/10 rounded-t-xl bg-black/5 font-bold">
          <h5 className="col-span-2">Company Name</h5>
          <h5>Industry</h5>
          <h5>Status</h5>
          <h5>Created On</h5>
          <h5>Employees</h5>
          <h5> Action</h5>
        </div>
        {clientsData.map((data, index) => (
          <div
            className={`px-4 py-3 grid grid-cols-1 md:grid-cols-7 border-x-2 border-b-2 border-black/10 outfit text-sm ${
              index === clientsData.length - 1 && "rounded-b-xl"
            }`}
          >
            <p className="col-span-2 text-black/80">{data.companyName}</p>
            <p className="text-black/80">{data.industry}</p>
            <p className="text-black/80">{data.status}</p>
            <p className="text-black/80">{data.createdOn}</p>
            <p className="text-black/80">{data.employees}</p>
            <div className="text-black/80 relative">
              <Ellipsis onClick={() => setOpenActionsIndex(index)} />
              {openActionsIndex === index && (
                <div className="top-2 border p-4 absolute bg-black z-50"></div>
              )}
            </div>
          </div>
        ))}
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
