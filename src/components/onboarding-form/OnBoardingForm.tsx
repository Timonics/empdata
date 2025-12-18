import React, { useState } from "react";
import Logo from "../logo";
import { ChevronDown, Upload, X } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CompanyGroupLifeOnboarding } from "@/types/onboarding.type";
import { encryptData } from "@/utils/encrypt";
import { toast } from "sonner";
import { useOnboardGroupLifeCompany } from "@/hooks/useOnboarding";

const OnBoardingForm: React.FC = () => {
  const onboardCompanyGroupLife = useOnboardGroupLifeCompany();

  const [identityCardPreview, setIdentityCardPreview] = useState<string[]>([]);
  const [cacPreview, setCacPreview] = useState<string>("");
  const [passportPreview, setPassportPreview] = useState<string>("");

  const [accountType, setAccountType] = useState<
    "individual" | "corporate" | "Employee Group Life" | null
  >(null);
  const [identityType, setIdentityType] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("");

  console.log(setSelectedPlan);

  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [openIdentityType, setOpenIdentityType] = useState<boolean>(false);
  const [openGender, setOpenGender] = useState<boolean>(false);

  const [onBoardingData, setOnBoardingData] =
    useState<CompanyGroupLifeOnboarding | null>(null);

  const identityCardType: {
    name: string;
    type: "nin" | "drivers_license" | "international_passport" | "voters_card";
  }[] = [
    { name: "Voter's Card", type: "voters_card" },
    { name: "Driver's Licence", type: "drivers_license" },
    { name: "International Passport", type: "international_passport" },
    { name: "National Identification Number", type: "nin" },
  ];
  const genderType = ["Male", "Female"];

  const handleIdentityCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (files.length === 0) {
      toast.error("Only JPG or PNG images are allowed for identity cards");
      return;
    }

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setIdentityCardPreview([...identityCardPreview, ...newImages]);

    setOnBoardingData((prevState) => ({
      ...prevState,
      director_identity_cards: files,
    }));
  };

  const removeImage = (
    type: "identity_card" | "cac" | "passport",
    index?: number
  ) => {
    type === "identity_card"
      ? setIdentityCardPreview(
          identityCardPreview.filter((_, i) => i !== index)
        )
      : type === "cac"
      ? setCacPreview("")
      : setPassportPreview("");
  };

  const handleCacUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const allowed = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowed.includes(file.type)) {
      toast.error("CAC document must be a PDF or image");
      return;
    }

    const img = URL.createObjectURL(file);
    setCacPreview(img);

    setOnBoardingData((prevState) => ({
      ...prevState,
      cac_document: file,
    }));
  };

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Passport photograph must be an image");
      return;
    }

    const img = URL.createObjectURL(file);
    setPassportPreview(img);

    setOnBoardingData((prevState) => ({
      ...prevState,
      director_passport_photograph: file,
    }));
  };

  console.log(onBoardingData);

  const handleSubmit = async () => {
    if (
      !onBoardingData?.director_bvn_number ||
      !onBoardingData.company_name ||
      !onBoardingData.rc_number ||
      !onBoardingData.country ||
      !onBoardingData.secondary_phone ||
      !onBoardingData.state ||
      !onBoardingData.city ||
      !onBoardingData.director_national_identification_number
    ) {
      return toast.error("Onboarding credientials in incomplete");
    }

    const encryptedBvnData = await encryptData(
      "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      onBoardingData.director_bvn_number
    );

    setOnBoardingData((prevState) => ({
      ...prevState,
      director_bvn_data: encryptedBvnData.data,
      director_bvn_iv: encryptedBvnData.iv,
      director_bvn_tag: encryptedBvnData.tag,
    }));

    if (onBoardingData.identity_card_type === "nin") {
      const encryptedNinData = await encryptData(
        "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
        onBoardingData.director_national_identification_number
      );

      setOnBoardingData((prevState) => ({
        ...prevState,
        nin_number_data: encryptedNinData.data,
        nin_number_iv: encryptedNinData.iv,
        nin_number_tag: encryptedNinData.tag,
      }));
    }

    await onboardCompanyGroupLife.mutateAsync(onBoardingData);
  };

  return (
    <div className="min-h-screen bg-sky-50/50 w-full">
      <div className="p-4 shadow-xl">
        <Logo />
      </div>
      <div className="flex flex-col mt-8 items-center p-4 gap-10">
        <h2 className="font-bold text-4xl text-center">
          SCIB ONBOARDING KYC FORM
        </h2>
        <div className="max-w-5xl w-full bg-white shadow-2xl shadow-black/40 rounded-md p-8 flex flex-col gap-4 min-h-[600px]">
          <label className="space-y-1">
            <h6 className="text-black/75 text-sm">Account Type</h6>
            <div
              className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-4 relative transition-transform"
              onClick={() => setOpenAccountType(!openAccountType)}
            >
              <h6
                className={`text-sm ${
                  accountType ? "text-black/70" : "text-black/50"
                }`}
              >
                {!accountType
                  ? "Select your Account Type"
                  : accountType.split("")[0].toUpperCase() +
                    accountType.split("").slice(1).join("") +
                    " Account"}
              </h6>
              <ChevronDown
                className={`w-8 h-5 ml-auto border-l border-black/10 text-black/50 ${
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
                      setAccountType("Employee Group Life");
                    }}
                  >
                    Employee Group Life Account
                  </div>
                </div>
              )}
            </div>
          </label>

          {accountType && (
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                {accountType !== "Employee Group Life"
                  ? "Policy Plan"
                  : "Company"}
              </h6>
              <div className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform">
                <h6
                  className={`text-sm ${
                    selectedPlan ? "text-black/70" : "text-black/50"
                  }`}
                >
                  {!selectedPlan
                    ? `Select your ${
                        accountType !== "Employee Group Life"
                          ? accountType.split("")[0].toUpperCase() +
                            accountType.split("").slice(1).join("")
                          : "Company"
                      } ${
                        accountType === "Employee Group Life"
                          ? "registered on Group Life"
                          : "Policy Plan"
                      }`
                    : ""}
                </h6>
                <ChevronDown
                  className={`w-8 h-5 ml-auto text-black/50 border-l border-black/10 ${
                    openAccountType ? "rotate-180" : ""
                  }`}
                />
                {openAccountType && (
                  <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost"></div>
                )}
              </div>
            </label>
          )}

          {accountType && (
            <>
              <div className="my-4">
                <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-sky-300 text-sky-900">
                  {accountType === "corporate" ? "COMPANY" : "BIO-DATA"}{" "}
                  INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jost">
                {accountType === "corporate" && (
                  <>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Company Name <span className="text-red-500">*</span>
                      </h6>
                      <input
                        type=""
                        onChange={(e) => {
                          setOnBoardingData((prevState) => ({
                            ...prevState,
                            company_name: e.target.value,
                          }));
                        }}
                        placeholder="Enter your company name"
                        className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Director's Name <span className="text-red-500">*</span>
                      </h6>
                      <input
                        type=""
                        onChange={(e) => {
                          setOnBoardingData((prevState) => ({
                            ...prevState,
                            director_name: e.target.value,
                          }));
                        }}
                        placeholder="Enter your director name"
                        className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        RC Number <span className="text-red-500">*</span>
                      </h6>{" "}
                      <input
                        type=""
                        onChange={(e) => {
                          setOnBoardingData((prevState) => ({
                            ...prevState,
                            rc_number: e.target.value,
                          }));
                        }}
                        placeholder="Enter your company's RC Number"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                  </>
                )}
                {accountType !== "corporate" && (
                  <>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Title <span className="text-red-500">*</span>
                      </h6>
                      <input
                        type=""
                        placeholder="Enter your title"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        First Name <span className="text-red-500">*</span>
                      </h6>{" "}
                      <input
                        type=""
                        placeholder="Enter your first name"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Last Name <span className="text-red-500">*</span>
                      </h6>{" "}
                      <input
                        type=""
                        placeholder="Enter your last name"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">Middle Name</h6>{" "}
                      <input
                        type=""
                        placeholder="Enter your middle name"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Gender <span className="text-red-500">*</span>
                      </h6>{" "}
                      <div
                        className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform"
                        onClick={() => setOpenGender(!openGender)}
                      >
                        <h6 className="text-sm text-black/70">
                          {!gender
                            ? "-- Select gender --"
                            : gender.split("")[0].toUpperCase() +
                              gender.split("").slice(1).join("")}
                        </h6>
                        <ChevronDown
                          className={`w-8 h-5 ml-auto border-l border-black/10 text-black/50 ${
                            openGender ? "rotate-180" : ""
                          }`}
                        />
                        {openGender && (
                          <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost z-50">
                            {genderType.map((gender) => (
                              <div
                                className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                                onClick={() => {
                                  setGender(gender);
                                }}
                              >
                                {gender}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Date of Birth <span className="text-red-500">*</span>
                      </h6>{" "}
                      <div className="border rounded-sm border-black/10 w-full p-2 px-4  focus:ring-sky-200 focus:border-transparent placeholder:text-sm">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="MMMM d, yyyy"
                          placeholderText="dd/mm/yyyy"
                          className="w-full"
                          isClearable
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                    </label>
                    <label className="space-y-1">
                      <h6 className="text-black/75 text-sm">
                        Nationality <span className="text-red-500">*</span>
                      </h6>{" "}
                      <input
                        type=""
                        placeholder="Enter nationality"
                        className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                      />
                    </label>
                  </>
                )}
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        phone_number: e.target.value,
                      }));
                    }}
                    placeholder="Enter phone number"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Confirm Phone Number <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    placeholder="Confirm phone number"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    {accountType === "corporate"
                      ? "Secoundary Number"
                      : "Foreign Number"}
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      accountType === "corporate"
                        ? setOnBoardingData((prevState) => ({
                            ...prevState,
                            secondary_phone: e.target.value,
                          }))
                        : "";
                    }}
                    placeholder={`Enter ${
                      accountType === "corporate" ? "secoundary" : "foreign"
                    } number`}
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        email_address: e.target.value,
                      }));
                    }}
                    placeholder="Enter email address"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Confirm Email Address{" "}
                    <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    placeholder="Confirm email address"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Country <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        country: e.target.value,
                      }));
                    }}
                    placeholder="Enter country"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    State <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        state: e.target.value,
                      }));
                    }}
                    placeholder="Enter state"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    City <span className="text-red-500">*</span>
                  </h6>{" "}
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        city: e.target.value,
                      }));
                    }}
                    placeholder="Enter city"
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>

                <>
                  <label className="space-y-1">
                    <h6 className="text-black/75 text-sm">
                      House Address <span className="text-red-500">*</span>
                    </h6>{" "}
                    <input
                      type=""
                      onChange={(e) => {
                        setOnBoardingData((prevState) => ({
                          ...prevState,
                          house_address: e.target.value,
                        }));
                      }}
                      placeholder="Enter house address"
                      className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                    />
                  </label>
                  <label className="space-y-1">
                    <h6 className="text-black/75 text-sm">
                      Previous House Address{" "}
                      <span className="text-red-500">*</span>
                    </h6>{" "}
                    <input
                      type=""
                      onChange={(e) => {
                        setOnBoardingData((prevState) => ({
                          ...prevState,
                          previous_address: e.target.value,
                        }));
                      }}
                      placeholder="Enter previous house address"
                      className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                    />
                  </label>
                </>
              </div>

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
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        director_bvn_number: e.target.value,
                      }));
                    }}
                    placeholder={`Enter ${
                      accountType !== "corporate" ? "BVN" : "Director's BVN"
                    } number`}
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Bank Name <span className="text-red-500">*</span>
                  </h6>
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        director_bank_name: e.target.value,
                      }));
                    }}
                    placeholder={`Enter ${
                      accountType !== "corporate" ? "bank" : "director's bank"
                    } name`}
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Bank Account Number <span className="text-red-500">*</span>
                  </h6>
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        director_bank_acct_number: e.target.value,
                      }));
                    }}
                    placeholder={`Enter ${
                      accountType !== "corporate"
                        ? "bank account"
                        : "director's bank account"
                    } number`}
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Tax Identification Number or Payer Identification Number
                  </h6>
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        director_tax_identification_number: e.target.value,
                      }));
                    }}
                    placeholder="Enter tax identification number "
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
              </div>

              <div className="my-4">
                <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-purple-300 text-purple-900">
                  {accountType === "corporate" && "DIRECTOR'S"} IDENTITY
                  INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jost">
                <label className="space-y-1 col-span-full">
                  <h6 className="text-black/75 text-sm">
                    National Identification Number
                    <span className="text-red-500">*</span>
                  </h6>
                  <input
                    type=""
                    onChange={(e) => {
                      setOnBoardingData((prevState) => ({
                        ...prevState,
                        director_national_identification_number: e.target.value,
                      }));
                    }}
                    placeholder={`Enter ${
                      accountType !== "corporate"
                        ? "national identification"
                        : "director's national identification"
                    } number`}
                    className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <h6 className="text-black/75 text-sm">
                    Identity Card Type <span className="text-red-500">*</span>
                  </h6>
                  <div
                    className="border rounded-sm border-black/10 w-full h-8 flex items-center pl-3 relative transition-transform"
                    onClick={() => setOpenIdentityType(!openIdentityType)}
                  >
                    <h6 className="text-sm text-black/70">
                      {!identityType
                        ? "-- Select your Identity Card Type --"
                        : identityType.split("")[0].toUpperCase() +
                          identityType.split("").slice(1).join("")}
                    </h6>
                    <ChevronDown
                      className={`w-8 h-5 ml-auto border-l border-black/10 text-black/50 ${
                        openIdentityType ? "rotate-180" : ""
                      }`}
                    />
                    {openIdentityType && (
                      <div className="border rounded-sm w-full absolute top-8 left-0 flex flex-col border-black/10 bg-white shadow-sm jost z-50">
                        {identityCardType.map((cardType) => (
                          <div
                            className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                            onClick={() => {
                              setIdentityType(cardType.name);
                              setOnBoardingData((prevState) => ({
                                ...prevState,
                                identity_card_type: cardType.type,
                              }));
                            }}
                          >
                            {cardType.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>

                {identityType !== "National Identification Number" && (
                  <label className="space-y-1">
                    <h6 className="text-black/75 text-sm">
                      Identity Card Number{" "}
                      <span className="text-red-500">*</span>
                    </h6>
                    <input
                      type=""
                      onChange={(e) => {
                        setOnBoardingData((prevState) => ({
                          ...prevState,
                          identity_card_number: e.target.value,
                        }));
                      }}
                      placeholder={`Enter ${
                        accountType !== "corporate"
                          ? "identity card"
                          : "director's identity card"
                      } number`}
                      className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-col gap-8 my-4">
                <div className="border border-gray-200 p-4 py-6">
                  <div className="flex flex-col gap-4">
                    <h6 className="text-black/75 font-semibold text-lg">
                      {accountType === "corporate" && "Director's"} Identity
                      Card: <span className="text-red-500">*</span>
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
                      {identityCardPreview.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage("identity_card", index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-primary text-black rounded-sm font-semibold text-xs px-2 py-0.5">
                              Cover
                            </div>
                          )}
                        </div>
                      ))}

                      {identityCardPreview.length < 8 && (
                        <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                          <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                          <span className="text-sm text-foreground/70">
                            Upload Identity Card
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleIdentityCardUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-4 py-6">
                  <div className="flex flex-col gap-4">
                    <h6 className="text-black/75 font-semibold text-lg">
                      CAC Document: <span className="text-red-500">*</span>
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
                      {!cacPreview && (
                        <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                          <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                          <span className="text-sm text-foreground/70 text-center">
                            Upload CAC Document
                          </span>
                          <input
                            type="file"
                            accept="application/pdf,image/png,image/jpeg"
                            onChange={handleCacUpload}
                            className="hidden"
                          />
                        </label>
                      )}

                      {cacPreview && (
                        <div className="relative aspect-square">
                          <img
                            src={cacPreview || "/placeholder.svg"}
                            alt={`Upload Cac doc`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage("cac")}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-4 py-6">
                  <div className="flex flex-col gap-4">
                    <h6 className="text-black/75 font-semibold text-lg">
                      {accountType === "corporate" && "Director's"} Passport
                      Photograph: <span className="text-red-500">*</span>
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 jost">
                      {!passportPreview && (
                        <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                          <Upload className="w-8 h-8 text-foreground/70 mb-2" />
                          <span className="text-sm text-foreground/70 text-center">
                            Upload Passport Photograph
                          </span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg"
                            onChange={handlePassportUpload}
                            className="hidden"
                          />
                        </label>
                      )}

                      {passportPreview && (
                        <div className="relative aspect-square">
                          <img
                            src={passportPreview || "/placeholder.svg"}
                            alt={`Upload passport`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage("passport")}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    onChange={(e) =>
                      setOnBoardingData((prev) => ({
                        ...prev,
                        consent_given: e.target.checked,
                      }))
                    }
                  />
                  <p className="font-medium text-lg">
                    By completing this form, you consent to us collecting and
                    processing your personal information to provide services to
                    you. You further consent that this information shall be
                    available to third-party service providers if required to
                    carry out this service(s). You agree that your personal data
                    may be released in compliance with a legal obligation to
                    which we are subject.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="mt-6 border w-fit px-20 py-3 rounded-md text-lg border-gray-400 bg-black/5 hover:bg-black/10"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingForm;
