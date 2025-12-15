import React, { useState } from "react";
import Logo from "../logo";
import { ChevronDown, Upload } from "lucide-react";

const OnBoardingForm: React.FC = () => {
  const [accountType, setAccountType] = useState<
    "individual" | "corporate" | "Group Life" | null
  >(null);

  const [onBoardingData, setOnBoardingData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    gender: '',
    nationality: "",
    phone_number: "",
    foreign_number: "",
    email_address: "",
    country: "",
    state: "",
    city: "",
    house_address: "",
    previous_house_address: "",
    bvn: "",
    bank_name: "",
    bank_account_number: ""
  })

  const [selectedPlan, setSelectedPlan] = useState("");

  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-sky-50/50 w-full">
      <div className="p-4 shadow-xl">
        <Logo />
      </div>
      <div className="flex flex-col mt-8 items-center p-4 gap-10">
        <h2 className="font-bold text-4xl">SCIB ONBOARDING KYC FORM</h2>
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-md p-8 flex flex-col gap-4">
          <label className="space-y-1">
            <h6 className="text-black/75 text-sm">Account Type</h6>
            <div
              className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform"
              onClick={() => setOpenAccountType(!openAccountType)}
            >
              <h6 className="text-sm text-black/70">
                {!accountType
                  ? "-- Select your Account Type --"
                  : accountType.split("")[0].toUpperCase() +
                    accountType.split("").slice(1).join("") +
                    " Account"}
              </h6>
              <ChevronDown
                className={`w-5 h-5 ml-auto mr-2 text-black/50 ${
                  openAccountType ? "rotate-180" : ""
                }`}
              />
              {openAccountType && (
                <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost z-50">
                  <div
                    className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                    onClick={() => {
                      setAccountType("individual");
                    }}
                  >
                    Individual Account
                  </div>
                  <div
                    className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                    onClick={() => {
                      setAccountType("corporate");
                    }}
                  >
                    Corporate Account
                  </div>
                  <div
                    className="text-sm p-2 px-4 hover:bg-black/3"
                    onClick={() => {
                      setAccountType("Group Life");
                    }}
                  >
                    Group Life Account
                  </div>
                </div>
              )}
            </div>
          </label>

          {accountType && (
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">{accountType !== "Group Life" ? "Policy Plan" : "Company"}</h6>
              <div className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform">
                <h6 className="text-sm text-black/70">
                  {!selectedPlan
                    ? `-- Select your ${accountType !== "Group Life"?
                        accountType.split("")[0].toUpperCase() +
                        accountType.split("").slice(1).join("")
                       : "Company"} Policy Plan --`
                    : ""}
                </h6>
                <ChevronDown
                  className={`w-5 h-5 ml-auto mr-2 text-black/50 ${
                    openAccountType ? "rotate-180" : ""
                  }`}
                />
                {openAccountType && (
                  <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost"></div>
                )}
              </div>
            </label>
          )}

          <div className="my-4">
            <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-sky-300 text-sky-900">
              BIO-DATA INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Title <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                First Name <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Last Name <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">Middle Name</h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Gender <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Date of Birth <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Nationality <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Phone Number <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Confirm Phone Number <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Foreign Number <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Email Address <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>

            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Confirm Email Address <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Country <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                State <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                City <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                House Address <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Previous House Address <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
          </div>

          <div className="my-4">
            <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-green-300 text-green-900">
              BANK INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                BVN <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>

            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Bank Name <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>

            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Bank Account Number <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>

            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Tax Identification Number or Payer Identification Number
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
          </div>

          <div className="my-4">
            <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-purple-300 text-purple-900">
              IDENTITY INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1 col-span-2">
              <h6 className="text-black/75 text-sm">
                National Identification Number
                <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Identity Card Type <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>

            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Identity Card Number <span className="text-red-500">*</span>
              </h6>
              <input
                type=""
                className="border rounded-sm border-black/10 w-full p-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
          </div>

          <div className="flex flex-col gap-8 my-4">
            <div className="border border-gray-200 p-4 py-6">
              <div className="flex flex-col gap-4">
                <h6 className="text-black/75 font-semibold text-lg">
                  Identity Card: <span className="text-red-500">*</span>
                </h6>
                <div className="p-4 rounded-sm border border-gray-600 flex items-center justify-center w-fit gap-2 relative">
                  <Upload />
                  Upload Your Identity Card
                  <input className="absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 py-6">
              <div className="flex flex-col gap-4">
                <h6 className="text-black/75 font-semibold text-lg">
                  Scanned Signature: <span className="text-red-500">*</span>
                </h6>
                <div className="p-4 rounded-sm border border-gray-600 flex items-center justify-center w-fit gap-2 relative">
                  <Upload />
                  Upload Your Scanned Signature
                  <input className="absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 py-6">
              <div className="flex flex-col gap-4">
                <h6 className="text-black/75 font-semibold text-lg">
                  Passport Photograph: <span className="text-red-500">*</span>
                </h6>
                <div className="p-4 rounded-sm border border-gray-600 flex items-center justify-center w-fit gap-2 relative">
                  <Upload />
                  Upload Your Passport Photograph:
                  <input className="absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <input type="checkbox" className="w-5 h-5" />
              <p className="font-medium text-lg">
                By completing this form, you consent to us collecting and
                processing your personal information to provide services to you.
                You further consent that this information shall be available to
                third-party service providers if required to carry out this
                service(s). You agree that your personal data may be released in
                compliance with a legal obligation to which we are subject.
              </p>
            </div>

            <button className="mt-6 border w-fit px-20 py-3 rounded-md text-lg border-gray-400 bg-black/5 hover:bg-black/10">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingForm;
