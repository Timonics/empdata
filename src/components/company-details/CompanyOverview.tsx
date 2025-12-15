import type { Company } from "@/interfaces/company.interface";
import React from "react";

type CompanyProps = {
  companyData: Company;
};

const CompanyOverview: React.FC<CompanyProps> = ({ companyData }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-2 px-4 flex flex-col gap-4 rounded-sm bg-black/2">
        <h3 className="text-xl font-medium">Company Information</h3>
        <div className="flex flex-col gap-4">
          <label className="space-y-1">
            <p className="text-black/50">Company Name:</p>
            <p className="font-medium">{companyData.name}</p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">Email:</p>
            <p className="font-medium">{companyData.email}</p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">RC Number:</p>
            <p className="font-medium">
              {companyData.rc_number ?? "-- Not Set --"}
            </p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">Address:</p>
            <p className="font-medium">
              {companyData.address ?? "-- Not Set --"}
            </p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">State:</p>
            <p className="font-medium">
              {companyData.state ?? "-- Not Set --"}
            </p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">Country:</p>
            <p className="font-medium">
              {companyData.country ?? "-- Not Set --"}
            </p>
          </label>
        </div>
        <div></div>
      </div>

      <div className="p-2 px-4 flex flex-col gap-4 rounded-sm bg-black/2">
        <h3 className="text-xl font-medium">Company Information</h3>
        <div className="flex flex-col gap-4">
          <label className="space-y-1">
            <p className="text-black/50">Company Name:</p>
            <p className="font-medium">{companyData.name}</p>
          </label>
          <label className="space-y-1">
            <p className="text-black/50">Email:</p>
            <p className="font-medium">{companyData.email}</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
