import { Plus } from "lucide-react";
import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";
import AddBeneficiary from "./components/AddBeneficiary";

const Beneficiaries: React.FC = () => {
  const [addBeneficiary, setAddBeneficiary] = useState(false);

  return (
    <div className="p-2">
      <div className="p-2 flex flex-col gap-4 mt-4">
        <h3 className="text-4xl">Your Beneficiaries</h3>
        <div className="rounded-xl p-4 bg-black/5 my-4">
          <div className="space-y-1 w-full">
            <p className="text-[#344054] font-medium">Search for Beneficiary</p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-1 pl-2 h-10 rounded-lg border-[1.5px] border-[#D0D5DD] poppins bg-white w-full">
                <TbSearch className="h-full w-5 text-sm text-black/30" />
                <input
                  placeholder="Search"
                  className="w-full pr-4 h-10 outline-none placeholder:text-sm placeholder:font-medium"
                  name="departmentSearchTerm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px] rounded-xl bg-black/10 flex items-center justify-center">
          <p className="text-2xl">No Beneficiaries Found</p>
        </div>
        <button
          onClick={() => setAddBeneficiary(true)}
          className="flex p-4 w-fit mx-auto my-4 rounded-lg items-center gap-2 shadow-xl bg-linear-to-br from-gray-800 to-black text-gray-400 font-medium hover:scale-105 transition duration-300 ease-in-out hover:text-sky-400"
        >
          <Plus />
          Add New Beneficiary
        </button>
      </div>
      {addBeneficiary && (
        <AddBeneficiary
          employeeId={1}
          addBeneficiary={addBeneficiary}
          setAddBeneficiary={setAddBeneficiary}
        />
      )}
    </div>
  );
};

export default Beneficiaries;
