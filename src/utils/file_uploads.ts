import { useState } from "react";
import { toast } from "sonner";

export const useFileUploads = () => {
  const [identityPreviews, setIdentityPreviews] = useState<string[]>([]);
  const [cacPreview, setCacPreview] = useState<string>("");
  const [passportPreview, setPassportPreview] = useState<string>("");

  const handleIdentityUpload = (
    files: FileList | null,
    onFiles: (files: File[]) => void
  ) => {
    if (!files) return;

    const valid = Array.from(files).filter((f) =>
      ["image/jpeg", "image/png"].includes(f.type)
    );

    if (!valid.length) {
      toast.error("Only JPG or PNG images allowed");
      return;
    }

    setIdentityPreviews((prev) => [...prev, ...valid.map(URL.createObjectURL)]);

    onFiles(valid);
  };

  return {
    identityPreviews,
    cacPreview,
    passportPreview,
    setCacPreview,
    setPassportPreview,
    handleIdentityUpload,
  };
};
