import React from "react";

type IProps = {
  setAddClient: (value: React.SetStateAction<boolean>) => void;
};

const AddCorporateClient: React.FC<IProps> = ({ setAddClient }) => {
  return (
    <>
      <div
        className="absolute inset-0 backdrop-blur-sm rounded-xl"
        onClick={() => setAddClient(false)}
      />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-6xl mx-auto w-full">
        <div className="p-4 rounded-xl flex flex-col gap-6 bg-white shadow-2xl overflow-auto scrollbar h-[calc(100vh-100px)]">
          <div className="space-y-1">
            <h3 className="text-3xl font-semibold">Add Corporate Client</h3>
            <p className="text-lg font-light">
              Provide necessary client information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="col-span-full text-xl font-semibold">
              Basic Information
            </h2>
            <input
              placeholder="Company Name"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Company Registration Number"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Company Tax ID"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Year Established"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Industry Sector"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Company Size"
              className="bg-black/10 p-4 rounded-xl"
            />

            <h2 className="col-span-full text-xl font-semibold mt-4">
              Contact Information
            </h2>
            <input
              placeholder="Primary Contact Person"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Contact Position/Title"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Official Email Address"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Phone Number"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Alternate Contact Number"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Company Address"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input placeholder="City" className="bg-black/10 p-4 rounded-xl" />
            <input placeholder="State" className="bg-black/10 p-4 rounded-xl" />
            <input
              placeholder="Country"
              className="bg-black/10 p-4 rounded-xl"
            />

            <h2 className="col-span-full text-xl font-semibold mt-4">
              Administrative Access Setup
            </h2>
            <input
              placeholder="Admin Email"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Temporary Admin Password"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Password Confirmation"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="User Role"
              className="bg-black/10 p-4 rounded-xl"
            />

            <h2 className="col-span-full text-xl font-semibold mt-4">
              Service Agreement
            </h2>
            <input
              placeholder="Admin Email"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Temporary Admin Password"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Password Confirmation"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="User Role"
              className="bg-black/10 p-4 rounded-xl"
            />
          </div>

          <button className="outfit p-4 rounded-xl bg-black text-white font-bold mt-4">
            Add Client
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCorporateClient;
