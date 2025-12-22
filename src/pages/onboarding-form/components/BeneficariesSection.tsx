// components/onboarding/BeneficiarySection.tsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

interface Beneficiary {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  date_of_birth: Date | null;
  percentage_allocation: string; // Keep as string for input
}

interface BeneficiarySectionProps {
  onBoardingData: any;
  setOnBoardingData: React.Dispatch<React.SetStateAction<any>>;
}

const BeneficiarySection: React.FC<BeneficiarySectionProps> = ({
  onBoardingData,
  setOnBoardingData,
}) => {
  // Initialize beneficiaries from onBoardingData or create empty array
  const beneficiaries: Beneficiary[] = onBoardingData?.beneficiaries || [
    {
      id: 1,
      first_name: "",
      last_name: "",
      address: "",
      date_of_birth: null,
      percentage_allocation: "",
    },
  ];

  const handleAddBeneficiary = () => {
    if (beneficiaries.length >= 5) {
      toast.error("Maximum of 5 beneficiaries allowed");
      return;
    }

    const newId =
      beneficiaries.length > 0
        ? Math.max(...beneficiaries.map((b) => b.id)) + 1
        : 1;
    const newBeneficiary: Beneficiary = {
      id: newId,
      first_name: "",
      last_name: "",
      address: "",
      date_of_birth: null,
      percentage_allocation: "",
    };

    const updatedBeneficiaries = [...beneficiaries, newBeneficiary];

    setOnBoardingData((prevState: any) => ({
      ...prevState,
      beneficiaries: updatedBeneficiaries,
    }));
  };

  const handleRemoveBeneficiary = (id: number) => {
    if (beneficiaries.length <= 1) {
      toast.error("At least one beneficiary is required");
      return;
    }

    const updatedBeneficiaries = beneficiaries.filter((b) => b.id !== id);

    setOnBoardingData((prevState: any) => ({
      ...prevState,
      beneficiaries: updatedBeneficiaries,
    }));
  };

  const updateBeneficiary = (
    id: number,
    field: keyof Beneficiary,
    value: any
  ) => {
    const updatedBeneficiaries = beneficiaries.map((beneficiary) => {
      if (beneficiary.id === id) {
        return { ...beneficiary, [field]: value };
      }
      return beneficiary;
    });

    setOnBoardingData((prevState: any) => ({
      ...prevState,
      beneficiaries: updatedBeneficiaries,
    }));
  };

  // Calculate total percentage
  const totalPercentage = beneficiaries.reduce((total, beneficiary) => {
    const percentage = parseFloat(beneficiary.percentage_allocation) || 0;
    return total + percentage;
  }, 0);

  // Validate percentage input
  const validatePercentage = (id: number, value: string) => {
    const numValue = parseFloat(value);

    if (value === "") {
      updateBeneficiary(id, "percentage_allocation", "");
      return;
    }

    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      toast.error("Percentage must be between 0 and 100");
      return;
    }

    // Check if adding this would exceed 100%
    const otherBeneficiariesTotal = beneficiaries
      .filter((b) => b.id !== id)
      .reduce(
        (total, b) => total + (parseFloat(b.percentage_allocation) || 0),
        0
      );

    if (otherBeneficiariesTotal + numValue > 100) {
      toast.error(
        `Total cannot exceed 100%. Current total: ${otherBeneficiariesTotal}%`
      );
      return;
    }

    updateBeneficiary(id, "percentage_allocation", value);
  };

  // Generate suggested percentages dropdown
  const generatePercentageOptions = () => {
    const options = [];
    for (let i = 10; i <= 100; i += 10) {
      options.push(i);
    }
    return options;
  };

  return (
    <>
      <div className="my-4">
        <h2 className="px-4 py-1 rounded-full shadow-md text-sm font-bold bg-indigo-300 text-indigo-900">
          BENEFICIARIES
        </h2>
      </div>

      <div className="space-y-6">
        {/* Total Percentage Indicator */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-semibold">Total Allocation:</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-bold ${
                totalPercentage === 100 ? "text-green-600" : "text-red-600"
              }`}
            >
              {totalPercentage}%
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  totalPercentage === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
          </div>
          {totalPercentage !== 100 && (
            <span className="text-red-500 text-sm">
              {totalPercentage < 100
                ? `Need ${100 - totalPercentage}% more`
                : "Exceeds 100%"}
            </span>
          )}
        </div>

        {/* Beneficiaries List */}
        {beneficiaries.map((beneficiary, index) => (
          <div
            key={beneficiary.id}
            className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Beneficiary {index + 1}</h3>
              {beneficiaries.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBeneficiary(beneficiary.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="space-y-1">
                <h6 className="text-black/75 text-sm">
                  First Name <span className="text-red-500">*</span>
                </h6>
                <input
                  type="text"
                  value={beneficiary.first_name}
                  onChange={(e) =>
                    updateBeneficiary(
                      beneficiary.id,
                      "first_name",
                      e.target.value
                    )
                  }
                  placeholder="Enter first name"
                  className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                />
              </label>

              <label className="space-y-1">
                <h6 className="text-black/75 text-sm">
                  Last Name <span className="text-red-500">*</span>
                </h6>
                <input
                  type="text"
                  value={beneficiary.last_name}
                  onChange={(e) =>
                    updateBeneficiary(
                      beneficiary.id,
                      "last_name",
                      e.target.value
                    )
                  }
                  placeholder="Enter last name"
                  className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <h6 className="text-black/75 text-sm">
                  Address <span className="text-red-500">*</span>
                </h6>
                <input
                  type="text"
                  value={beneficiary.address}
                  onChange={(e) =>
                    updateBeneficiary(beneficiary.id, "address", e.target.value)
                  }
                  placeholder="Enter address"
                  className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                />
              </label>

              <label className="space-y-1">
                <h6 className="text-black/75 text-sm">
                  Date of Birth <span className="text-red-500">*</span>
                </h6>
                <div className="border rounded-sm border-black/10 w-full p-2 px-4 focus:ring-sky-200 focus:border-transparent">
                  <DatePicker
                    selected={beneficiary.date_of_birth}
                    onChange={(date) =>
                      updateBeneficiary(beneficiary.id, "date_of_birth", date)
                    }
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select date of birth"
                    className="w-full"
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                    maxDate={new Date()}
                  />
                </div>
              </label>

              <label className="space-y-1">
                <h6 className="text-black/75 text-sm">
                  Percentage Allocation <span className="text-red-500">*</span>
                </h6>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={beneficiary.percentage_allocation}
                    onChange={(e) =>
                      validatePercentage(beneficiary.id, e.target.value)
                    }
                    placeholder="Enter percentage"
                    className="border rounded-sm border-black/10 w-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
                  />
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        validatePercentage(beneficiary.id, e.target.value);
                      }
                    }}
                    className="border rounded-sm border-black/10 p-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent"
                  >
                    <option value="">Quick select</option>
                    {generatePercentageOptions().map((option) => (
                      <option key={option} value={option}>
                        {option}%
                      </option>
                    ))}
                  </select>
                </div>
                {beneficiary.percentage_allocation && (
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${beneficiary.percentage_allocation}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {beneficiary.percentage_allocation}% allocated
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* Allocation summary for this beneficiary */}
            {beneficiary.percentage_allocation && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <span className="text-sm text-blue-700">
                  {beneficiary.first_name || "This beneficiary"} will receive{" "}
                  <strong>{beneficiary.percentage_allocation}%</strong> of the
                  total benefit
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Add Beneficiary Button */}
        {beneficiaries.length < 5 && (
          <button
            type="button"
            onClick={handleAddBeneficiary}
            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Beneficiary</span>
            <span className="text-sm text-gray-500 ml-auto">
              ({beneficiaries.length}/5 added)
            </span>
          </button>
        )}

        {/* Distribution Summary */}
        {beneficiaries.some((b) => b.percentage_allocation) && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold mb-3">Distribution Summary</h4>
            <div className="space-y-2">
              {beneficiaries
                .filter((b) => b.percentage_allocation)
                .map((beneficiary) => (
                  <div
                    key={beneficiary.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {beneficiary.first_name || "Unnamed"}{" "}
                      {beneficiary.last_name}
                    </span>
                    <span className="font-semibold">
                      {beneficiary.percentage_allocation}%
                    </span>
                  </div>
                ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Allocation</span>
                  <span
                    className={
                      totalPercentage === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {totalPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Validation Message */}
        {totalPercentage !== 100 && (
          <div
            className={`p-4 rounded-lg ${
              totalPercentage < 100 ? "bg-yellow-50" : "bg-red-50"
            }`}
          >
            <p
              className={`font-medium ${
                totalPercentage < 100 ? "text-yellow-700" : "text-red-700"
              }`}
            >
              {totalPercentage < 100
                ? `⚠️ The total allocation is ${totalPercentage}%. You need to allocate ${
                    100 - totalPercentage
                  }% more.`
                : `⚠️ The total allocation exceeds 100% (${totalPercentage}%). Please adjust the percentages.`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BeneficiarySection;
