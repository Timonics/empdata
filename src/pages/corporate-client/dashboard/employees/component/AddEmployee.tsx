import { useCreateEmployee } from "@/hooks/useEmployee";
import type { RootState } from "@/store/store";
import type { CreateEmployee } from "@/types/employee.type";
import { LoaderCircle } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type IProps = {
  setAddEmployee: (value: React.SetStateAction<boolean>) => void;
};

const AddEmployee: React.FC<IProps> = ({ setAddEmployee }) => {
  const createEmployee = useCreateEmployee("company");

  const { clientsAuthData } = useSelector(
    (state: RootState) => state.clientsAuth
  );

  const [employeeData, setEmployeeData] = useState<CreateEmployee>({
    company_id: clientsAuthData?.id ?? 0,
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
  });

  console.log(employeeData);

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
    if (employeeData.company_id === 0) {
      toast.error("Company Id not added...please refresh...");
      return;
    }

    if (
      !employeeData.first_name.trim() ||
      !employeeData.last_name.trim() ||
      !employeeData.email.trim()
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
      date_of_birth: "",
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

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full">
        <div className="p-4 rounded-lg flex flex-col gap-6 bg-white shadow-2xl overflow-auto scrollbar h-[calc(100vh-100px)]g">
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
            <input
              name="first_name"
              value={employeeData.first_name}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
            <input
              name="last_name"
              value={employeeData.last_name}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
            <input
              name="email"
              value={employeeData.email}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
            <input
              name="date_of_birth"
              value={employeeData.date_of_birth}
              placeholder="YYYY-MM-DD"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-black/5"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="outfit py-4 px-8 rounded-xl bg-black text-white font-bold mt-4 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary flex items-center justify-center w-fit"
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
