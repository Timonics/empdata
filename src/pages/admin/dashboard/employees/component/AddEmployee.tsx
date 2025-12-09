import { useCompanies } from "@/hooks/useCompany";
import { useCreateEmployee } from "@/hooks/useEmployee";
import type { CreateEmployee } from "@/types/employee.type";
import { ChevronDown, ChevronUp, Loader2, LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type IProps = {
  setAddEmployee: (value: React.SetStateAction<boolean>) => void;
};

const AddEmployee: React.FC<IProps> = ({ setAddEmployee }) => {
  const createEmployee = useCreateEmployee("admin");

  const [openCompanies, setOpenCompanies] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [employeeData, setEmployeeData] = useState<CreateEmployee>({
    company_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: ""
  });

  const { isLoading, error, data } = useCompanies();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (
      employeeData.company_id === 0 ||
      !employeeData.first_name.trim() ||
      !employeeData.last_name.trim() ||
      !employeeData.email.trim() ||
      !employeeData.date_of_birth
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    await createEmployee.mutateAsync(employeeData);
  };

  if (createEmployee.isSuccess && !createEmployee.isPending) {
    setEmployeeData({
      company_id: 0,
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: ""
    });

    setAddEmployee(false);
  }

  return (
    <>
      <div
        className="absolute inset-0 backdrop-blur-sm rounded-xl z-10"
        onClick={() => {
          setAddEmployee(false);
        }}
      />

      <div
        className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full"
        onClick={() => {
          if (openCompanies) setOpenCompanies(false);
        }}
      >
        <div className="p-4 rounded-xl flex flex-col gap-6 bg-white shadow-2xl overflow-auto scrollbar h-[calc(100vh-100px)]g">
          <div className="space-y-1">
            <h3 className="text-3xl font-semibold">Add Employee</h3>
            <p className="text-lg font-light">
              Provide necessary employee information.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <h2 className="col-span-full text-xl font-semibold">
              Basic Information
            </h2>
            <div className="flex flex-col gap-2">
              <div
                className="border border-muted-foreground p-4 rounded-xl relative flex justify-between"
                onClick={() => setOpenCompanies(!openCompanies)}
              >
                {!isLoading && !error && (
                  <>
                    <p className="text-gray-800">
                      {selectedCompanyName
                        ? selectedCompanyName
                        : "-- Select Employee's Company --"}
                    </p>
                    {!openCompanies ? <ChevronDown /> : <ChevronUp />}
                  </>
                )}
                {data && openCompanies && (
                  <div className="absolute top-15 left-0 border border-muted-foreground w-full max-h-[150px] rounded-lg z-50 bg-white overflow-auto flex flex-col shadow-xl">
                    {data.map((company) => (
                      <button
                        onClick={() => {
                          setSelectedCompanyName(company.name);
                          setEmployeeData((prevState) => ({
                            ...prevState,
                            company_id: company.id,
                          }));
                        }}
                        className="not-first:border-t border-muted-foreground hover:bg-sky-50 p-3"
                      >
                        {company.name}
                      </button>
                    ))}
                  </div>
                )}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 text-gray-400">
                    <Loader2 className="animate-spin" />
                    Loading Companies
                  </div>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-500">
                  Error Encountered fetching Companies...Reload to try again...
                </p>
              )}
            </div>
            <input
              name="first_name"
              value={employeeData.first_name}
              placeholder="First Name"
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
            <input
              name="last_name"
              value={employeeData.last_name}
              placeholder="Last Name"
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
            <input
              name="email"
              value={employeeData.email}
              placeholder="Email"
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
            <input
              name="date_of_birth"
              value={employeeData.date_of_birth}
              placeholder="Date of Birth (YYYY-MM-DD)"
              className="bg-black/10 p-4 rounded-xl"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="outfit p-4 rounded-xl bg-black text-white font-bold mt-4 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary flex items-center justify-center"
          >
            {createEmployee.isPending ? (
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

export default AddEmployee;
