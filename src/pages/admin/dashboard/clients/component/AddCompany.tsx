import { useCreateCompany } from "@/hooks/useCompany";
import type { CreateCompany } from "@/types/company.type";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type IProps = {
  setAddClient: (value: React.SetStateAction<boolean>) => void;
};

const AddCorporateClient: React.FC<IProps> = ({ setAddClient }) => {
  const createCompany = useCreateCompany();

  const [companyData, setCompanyData] = useState<CreateCompany>({
    company_name: "",
    company_email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (!companyData.company_email.trim() || !companyData.company_name.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    await createCompany.mutateAsync(companyData);
  };

  if (createCompany.isSuccess && !createCompany.isPending) {
    setCompanyData({
      company_name: "",
      company_email: "",
    });

    setAddClient(false);
  }

  return (
    <>
      <div
        className="absolute inset-0 backdrop-blur-sm rounded-xl z-10 bg-black/5"
        onClick={() => setAddClient(false)}
      />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full">
        <div className="p-4 flex flex-col gap-6 bg-white shadow-xl overflow-auto scrollbar h-[calc(100vh-100px)]g">
          <div className="space-y-1">
            <h3 className="text-3xl font-semibold">Add Company</h3>
            <p className="text-lg text-black/40">
              Provide necessary company information.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <h2 className="col-span-full text-xl font-semibold">
              Basic Information
            </h2>
            <input
              name="company_name"
              value={companyData.company_name}
              placeholder="Company Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
            <input
              name="company_email"
              value={companyData.company_email}
              placeholder="Company Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="outfit w-fit px-8 p-2 rounded-md bg-black text-white font-bold mt-4 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary flex items-center justify-center"
          >
            {createCompany.isPending ? (
              <LoaderCircle className="animate-spin size-8" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCorporateClient;
