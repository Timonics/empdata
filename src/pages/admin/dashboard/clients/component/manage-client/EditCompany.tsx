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
          <p>Loading company…</p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" placeholder={data.name} />
          <input className="input" placeholder={data.email} />
          <input
            className="input"
            placeholder={data.rc_number || "RC Number"}
          />
          <input className="input" placeholder={data.address || "Address"} />
          <input className="input" placeholder={data.city || "City"} />
          <input className="input" placeholder={data.state || "State"} />
          <input className="input" placeholder={data.country || "Country"} />
          <input
            className="input"
            placeholder={data.insurance_type || "Insurance"}
          />
          <input
            className="input"
            placeholder={data.registration_date || "Registration"}
          />
          <input
            className="input"
            placeholder={data.license_number || "License"}
          />
          <input className="input" placeholder={data.status} />
        </div>
      )}
    </SlideDrawer>
  );
};

export default EditCompany;
