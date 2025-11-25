import React from "react";

type IProps = {
  setAddClient: (value: React.SetStateAction<boolean>) => void;
};

const AddCorporateClient: React.FC<IProps> = ({ setAddClient }) => {
  return (
    <>
      <div
        className="absolute inset-0 backdrop-blur-sm rounded-xl z-10"
        onClick={() => setAddClient(false)}
      />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-5xl mx-auto w-full">
        <div className="p-4 rounded-xl flex flex-col gap-6 bg-white shadow-2xl overflow-auto scrollbar h-[calc(100vh-100px)]g">
          <div className="space-y-1">
            <h3 className="text-3xl font-semibold">Add Company</h3>
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
              placeholder="Company Email"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Company Admin Password"
              className="bg-black/10 p-4 rounded-xl"
            />
            <input
              placeholder="Contact Position/Title"
              className="bg-black/10 p-4 rounded-xl"
            />
          </div>

          <button className="outfit p-4 rounded-xl bg-black text-white font-bold mt-4 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary">
            Add Client
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCorporateClient;
