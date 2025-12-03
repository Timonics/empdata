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
  const { isLoading, error, data } = useCompany(companyId);

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
        <div className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
          <p className="text-3xl">Loading company…</p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.name}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.email}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.rc_number || "RC Number"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.address || "Address"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.city || "City"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.state || "State"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.country || "Country"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.insurance_type || "Insurance"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.registration_date || "Registration"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.license_number || "License"}
          />
          <input
            className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            placeholder={data.status}
          />
        </div>
      )}
      <button className="px-6 py-3 rounded-lg bg-black text-sky-300 hover:bg-sky-200 hover:text-black">
        Edit {data ? data.name : "Company"}
      </button>
    </SlideDrawer>
  );
};

export default EditCompany;
