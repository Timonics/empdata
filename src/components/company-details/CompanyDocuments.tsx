import { Eye } from "lucide-react";
import React from "react";

const CompanyDocuments: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-2 px-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium">Company Documents</h3>
        <div className="flex flex-col gap-2">
          <div className="mt-2 bg-black/2 p-4 pl-6 rounded-sm flex justify-between items-center w-full">
            <h2>CAC Document</h2>
            <div className="flex items-center gap-6 jost">
              <div className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-500">
                verified
              </div>
              <div className="gap-1 flex items-center text-blue-500 cursor-pointer">
                <Eye size={20} />
                view
              </div>
            </div>
          </div>
          <div className="mt-2 bg-black/2 p-4 pl-6 rounded-sm flex justify-between items-center w-full">
            <h2>Memorandum & Articles of Association (M&A)</h2>
            <div className="flex items-center gap-6 jost">
              <div className="text-sm jost px-2 py-1 rounded-full bg-red-100 text-red-500">
                unverified
              </div>
              <div className="gap-1 flex items-center text-blue-500 cursor-pointer">
                <Eye size={20} />
                view
              </div>
            </div>
          </div>
          <div className="mt-2 bg-black/2 p-4 pl-6 rounded-sm flex justify-between items-center w-full">
            <h2>Business Registration Address</h2>
            <div className="flex items-center gap-6 jost">
              <div className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-500">
                verified
              </div>
              <div className="gap-1 flex items-center text-blue-500 cursor-pointer">
                <Eye size={20} />
                view
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDocuments;
