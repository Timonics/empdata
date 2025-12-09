import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { RootState } from "@/store/store";
import { encryptData } from "@/utils/encrypt";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const NINValidation: React.FC = () => {
  // const secretKey = import.meta.env.NIN_ENCRYPTION_KEY;

  const { clientsAuthData } = useSelector(
    (state: RootState) => state.clientsAuth
  );

  const { loading, ninVerify } = useAuth("employee");
  const [ninNumber, setNinNumber] = useState<string>("");

  const handleSubmit = async () => {

    if(ninNumber.length !== 11) {
      return toast.error("NIN must be 11 digits")
    }

    const ninVerificationData = await encryptData(
      "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      ninNumber
    );

    if (!ninVerificationData) {
      return Error("NIN encryption failed, please retry...");
    }

    const verifiedData = await ninVerify(
      clientsAuthData?.employee_id!,
      ninVerificationData
    ).unwrap();

    console.log(verifiedData);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">Verify your NIN</h2>
        <p className="text-sm md:text-base font-light text-black/70">
          Verify your NIN information.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <input
          name="ninNumber"
          placeholder="NIN"
          type="text"
          className="p-4 rounded-xl w-full bg-black/10 "
          onChange={(e) => {
            setNinNumber(e.target.value);
          }}
        />
      </div>
      <Button
        size={"xl"}
        className="w-full text-xl font-bold text-sky-300 hover:bg-sky-400 hover:text-black transition duration-300 ease-in-out primary"
        onClick={handleSubmit}
      >
        {loading ? <LoaderCircle className="animate-spin size-8" /> : "Verify"}
      </Button>
    </div>
  );
};

export default NINValidation;
