import Logo from "@/components/logo";
import { useCompany } from "@/hooks/useCompany";
import { LoaderCircle, X } from "lucide-react";
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
    <div className="">
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50
          transition-all duration-300 ease-in-out
          ${showEditCompany ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        onClick={() => setShowEditCompany(false)}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-r-lg transform transition-transform ease-in-out duration-300 p-2 flex flex-col gap-4 ${
          showEditCompany
            ? "translate-x-0 shadow-2xl shadow-sky-50"
            : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <Logo />
          <X
            className="text-black/75 mr-2 cursor-pointer hover:text-red-600 transition duration-300"
            onClick={() => setShowEditCompany(false)}
          />
        </div>
        <div className="flex flex-col h-full items-center justify-center">
          {isLoading && (
            <div className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              <p>Loading client...</p>
            </div>
          )}
          {data ? (
            <div className="w-full p-2 gap-2 grid grid-col-1 md:grid-col-2 h-full overflow-auto">
              <input
                placeholder={data.name}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.email}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.rc_number || "Set RC Number"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.address || "Add Address"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.city || "Add City"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.state || "Add State"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.country || "Add Country"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.insurance_type || "Add Insurance type"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.registration_date || "Add Registration Date"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.license_number || "Add Licence Number"}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
              <input
                placeholder={data.status}
                className="w-full p-2 border-muted-foreground border rounded-lg"
              />
            </div>
          ) : (
            !isLoading && <p>Company details not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
