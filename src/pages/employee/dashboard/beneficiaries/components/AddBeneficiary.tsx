import SlideDrawer from "@/components/slider-drawer";
import { Upload } from "lucide-react";
import React from "react";

type IProps = {
  employeeId: number;
  addBeneficiary: boolean;
  setAddBeneficiary: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBeneficiary: React.FC<IProps> = ({
  addBeneficiary,
  setAddBeneficiary,
}) => {
  return (
    <SlideDrawer
      open={addBeneficiary}
      onClose={() => setAddBeneficiary(false)}
      title="Add Beneficiary"
    >
      <div className="w-full rounded-xl p-4 flex flex-col gap-4">
        <input placeholder="First Name" className="bg-black/5 p-4 rounded-lg" />
        <input placeholder="Last Name" className="bg-black/5 p-4 rounded-lg" />
        <input placeholder="Address" className="bg-black/5 p-4 rounded-lg" />
        <input
          placeholder="Date of Birth (YYYY-MM-DD)"
          className="bg-black/5 p-4 rounded-lg"
        />
        <input
          placeholder="Percentage Allocation (%)"
          className="bg-black/5 p-4 rounded-lg"
        />
        <label className="p-6 h-[200px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
          <Upload className="w-8 h-8 text-foreground/70 mb-2" />
          <span className="text-sm text-foreground/70">Upload Photo</span>
          <input
            type="file"
            accept="image/*"
            multiple
            // onChange={handleImageUpload}
            className="hidden"
          />
        </label>{" "}
        <button className="text-xl bg-black text-sky-500 font-semibold rounded-lg p-4">
          Submit
        </button>
      </div>
    </SlideDrawer>
  );
};

export default AddBeneficiary;
