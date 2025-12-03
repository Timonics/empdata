import type { Company } from "@/interfaces/company.interface";
import React from "react";

type IProps = {
  setShowStatus: (value: React.SetStateAction<boolean>) => void;
  companies: Company[]
};

const Status: React.FC<IProps> = ({ setShowStatus }) => {
   return (
    <>
      <div
        className="absolute inset-0 backdrop-blur-sm rounded-xl z-10"
        onClick={() => setShowStatus(false)}
      />
    </>
  );
};

export default Status;
