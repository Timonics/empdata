// components/onboarding/BioDataSection.tsx
import React from "react";
import { ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BioDataSectionProps {
  accountType: "individual" | "corporate" | "Employee Group Life" | null;
  gender: string;
  setGender: (gender: string) => void;
  openGender: boolean;
  setOpenGender: (open: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onBoardingData: any;
  setOnBoardingData: React.Dispatch<React.SetStateAction<any>>;
}

const BioDataSection: React.FC<BioDataSectionProps> = ({
  accountType,
  gender,
  setGender,
  openGender,
  setOpenGender,
  selectedDate,
  setSelectedDate,
  onBoardingData,
  setOnBoardingData,
}) => {
  const genderType = ["Male", "Female"];

  return (
    <>
      <div className="my-4">
        <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-sky-300 text-sky-900">
          {accountType === "corporate" ? "COMPANY" : "BIO-DATA"} INFORMATION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jost">
        {accountType === "corporate" ? (
          <>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Company Name <span className="text-red-500">*</span>
              </h6>
              <input
                type="text"
                value={onBoardingData?.company_name || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
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
                type="text"
                value={onBoardingData?.director_name || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
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
                type="text"
                value={onBoardingData?.rc_number || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    rc_number: e.target.value,
                  }));
                }}
                placeholder="Enter your company's RC Number"
                className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
              />
            </label>
          </>
        ) : (
          <>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Title <span className="text-red-500">*</span>
              </h6>
              <input
                type="text"
                value={onBoardingData?.title || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    title: e.target.value,
                  }));
                }}
                placeholder="Enter your title"
                className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                First Name <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type="text"
                value={onBoardingData?.first_name || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    first_name: e.target.value,
                  }));
                }}
                placeholder="Enter your first name"
                className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">
                Last Name <span className="text-red-500">*</span>
              </h6>{" "}
              <input
                type="text"
                value={onBoardingData?.last_name || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    last_name: e.target.value,
                  }));
                }}
                placeholder="Enter your last name"
                className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
              />
            </label>
            <label className="space-y-1">
              <h6 className="text-black/75 text-sm">Middle Name</h6>{" "}
              <input
                type="text"
                value={onBoardingData?.middle_name || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    middle_name: e.target.value,
                  }));
                }}
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
                    {genderType.map((genderItem) => (
                      <div
                        key={genderItem}
                        className="text-sm p-2 px-4 border-b border-black/10 hover:bg-black/3"
                        onClick={() => {
                          setGender(genderItem);
                          setOnBoardingData((prevState: any) => ({
                            ...prevState,
                            gender: genderItem,
                          }));
                        }}
                      >
                        {genderItem}
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
                  onChange={(date) => {
                    setSelectedDate(date);
                    setOnBoardingData((prevState: any) => ({
                      ...prevState,
                      date_of_birth: date,
                    }));
                  }}
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
                type="text"
                value={onBoardingData?.nationality || ""}
                onChange={(e) => {
                  setOnBoardingData((prevState: any) => ({
                    ...prevState,
                    nationality: e.target.value,
                  }));
                }}
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
            type="tel"
            value={onBoardingData?.phone_number || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                phone_number: e.target.value,
              }));
            }}
            placeholder="Phone number"
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Confirm Phone Number <span className="text-red-500">*</span>
          </h6>{" "}
          <input
            type="tel"
            value={onBoardingData?.confirm_phone_number || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                confirm_phone_number: e.target.value,
              }));
            }}
            placeholder="Confirm phone number"
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            {accountType === "corporate" ? "Secondary Number" : "Foreign Number"}
          </h6>{" "}
          <input
            type="tel"
            value={onBoardingData?.secondary_phone || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                secondary_phone: e.target.value,
              }));
            }}
            placeholder={`Enter ${
              accountType === "corporate" ? "secondary" : "foreign"
            } number`}
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Email Address <span className="text-red-500">*</span>
          </h6>{" "}
          <input
            type="email"
            value={onBoardingData?.email_address || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
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
            Confirm Email Address <span className="text-red-500">*</span>
          </h6>{" "}
          <input
            type="email"
            value={onBoardingData?.confirm_email_address || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                confirm_email_address: e.target.value,
              }));
            }}
            placeholder="Confirm email address"
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            Country <span className="text-red-500">*</span>
          </h6>{" "}
          <input
            type="text"
            value={onBoardingData?.country || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
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
            type="text"
            value={onBoardingData?.state || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
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
            type="text"
            value={onBoardingData?.city || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                city: e.target.value,
              }));
            }}
            placeholder="Enter city"
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>

        {/* Address fields */}
        <label className="space-y-1">
          <h6 className="text-black/75 text-sm">
            House Address <span className="text-red-500">*</span>
          </h6>{" "}
          <input
            type="text"
            value={onBoardingData?.house_address || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
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
            Previous House Address
          </h6>{" "}
          <input
            type="text"
            value={onBoardingData?.previous_address || ""}
            onChange={(e) => {
              setOnBoardingData((prevState: any) => ({
                ...prevState,
                previous_address: e.target.value,
              }));
            }}
            placeholder="Enter previous house address"
            className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
          />
        </label>
      </div>
    </>
  );
};

export default BioDataSection;