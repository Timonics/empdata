import { useCreateCompany } from "@/hooks/useCompany";
import type { CreateCompany } from "@/types/company.type";
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
        className="absolute inset-0 backdrop-blur-sm rounded-xl z-10"
        onClick={() => setAddClient(false)}
      />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full">
        <div className="p-4 rounded-xl flex flex-col gap-6 bg-white shadow-2xl overflow-auto scrollbar h-[calc(100vh-100px)]g">
          <div className="space-y-1">
            <h3 className="text-3xl font-semibold">Add Company</h3>
            <p className="text-lg font-light">
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
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
            <input
              name="company_email"
              value={companyData.company_email}
              placeholder="Company Email"
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="outfit p-4 rounded-xl bg-black text-white font-bold mt-4 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
          >
            Add Client
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCorporateClient;
