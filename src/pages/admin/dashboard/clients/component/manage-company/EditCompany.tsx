import SlideDrawer from "@/components/slider-drawer";
import { useCompany } from "@/hooks/useCompany";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type IProps = {
  companyId: number;
  showEditCompany: boolean;
  setShowEditCompany: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCompany: React.FC<IProps> = ({
  companyId,
  showEditCompany,
  setShowEditCompany,
}) => {
  const { isLoading, error, isError, refetch, data } = useCompany(companyId);

  if (error) {
    toast.error(error.message || "Failed to fetch company details");
  }

  return (
    <SlideDrawer
      open={showEditCompany}
      onClose={() => setShowEditCompany(false)}
      title="Edit Company"
    >
      {isLoading && (
        <div className="flex items-center gap-2 h-[300px]">
          <LoaderCircle className="animate-spin" />
          <p className="text-3xl">Loading company…</p>
        </div>
      )}

      {isError && (
        <div className="h-[300px] flex flex-col items-center">
          Company Details Not Found
          <button
            className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-1">
            <p>Company Name</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Company Email</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>RC Number</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.rc_number || "RC Number"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Company Address</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.address || "Address"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>City</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.city || "City"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>State</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.state || "State"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Country</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.country || "Country"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Insurance Type</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.insurance_type || "Insurance Type"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Company Registration Date</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.registration_date || "Registration"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Company Licence Number</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.license_number || "License"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Status</p>
            <input
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder={data.status}
            />
          </div>
        </div>
      )}
      {!isLoading && !isError && data && (
        <button className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black text-xl">
          Submit
        </button>
      )}
    </SlideDrawer>
  );
};

export default EditCompany;
