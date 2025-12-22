import React from "react";

interface BankInfoSectionProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  onBoardingData: any;
  setOnBoardingData: React.Dispatch<React.SetStateAction<any>>;
}

const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  accountType,
  onBoardingData,
  setOnBoardingData,
}) => {
  return (
    <>
      <div className="my-4">
        <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-green-300 text-green-900">
          {accountType === "corporate" && "DIRECTOR'S"} BANK INFORMATION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jost">
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            BVN <span className="text-red-500">*</span>
          </h6>
          {accountType === "individual" ? (
            <input
              type=""
              value={onBoardingData?.bvn ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  bvn: e.target.value,
                }));
              }}
              placeholder={`Enter BVN number`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          ) : (
            <input
              type=""
              value={onBoardingData?.director_bvn_number ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  director_bvn_number: e.target.value,
                }));
              }}
              placeholder={`Enter Director's BVN number`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          )}
        </label>

        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Bank Name <span className="text-red-500">*</span>
          </h6>
          {accountType !== "corporate" ? (
            <input
              type=""
              value={onBoardingData?.bank_name ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  bank_name: e.target.value,
                }));
              }}
              placeholder={`Enter bank name`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          ) : (
            <input
              type=""
              value={onBoardingData?.director_bank_name ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  director_bank_name: e.target.value,
                }));
              }}
              placeholder={`Enter Director's Bank name`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          )}
        </label>

        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Bank Account Number <span className="text-red-500">*</span>
          </h6>
          {accountType !== "corporate" ? (
            <input
              type=""
              value={onBoardingData?.bank_account_number ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  bank_account_number: e.target.value,
                }));
              }}
              placeholder={`Enter bank account`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          ) : (
            <input
              type=""
              value={onBoardingData?.director_bank_acct_number ?? ""}
              onChange={(e) => {
                setOnBoardingData((prevState: any) => ({
                  ...prevState,
                  director_bank_acct_number: e.target.value,
                }));
              }}
              placeholder={`Enter Director's bank account`}
              className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
            />
          )}
        </label>

        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Tax Identification Number or Payer Identification Number{" "}
            <span className="text-red-500">*</span>
          </h6>
          <input
            type=""
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                director_tax_identification_number: e.target.value,
              }));
            }}
            placeholder="Enter tax identification number "
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
      </div>
    </>
  );
};

export default BankInfoSection;
