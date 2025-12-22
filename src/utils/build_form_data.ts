import type {
  CompanyGroupLifeOnboarding,
  IndividualOnboarding,
} from "@/types/onboarding.type";

export const buildFormData = (
  data: CompanyGroupLifeOnboarding | IndividualOnboarding | any,
  accountType: string
) => {
  const formData = new FormData();

  // Handle identity cards based on account type
  if (accountType === "corporate" || accountType === "Employee Group Life") {
    // Corporate - use director_identity_cards
    if (
      data.director_identity_cards &&
      data.director_identity_cards instanceof File
    ) {
      formData.append("director_identity_cards", data.director_identity_cards);
    }
  } else if (accountType === "individual") {
    // Individual - use identity_cards
    if (data.identity_cards && data.identity_cards instanceof File) {
      formData.append("identity_cards", data.identity_cards);
    }
  }

  // Handle CAC document (corporate only)
  if (
    accountType === "corporate" &&
    data.cac_document &&
    data.cac_document instanceof File
  ) {
    formData.append("cac_document", data.cac_document);
  }

  // Handle passport photograph based on account type
  if (accountType === "corporate" || accountType === "Employee Group Life") {
    if (
      data.director_passport_photograph &&
      data.director_passport_photograph instanceof File
    ) {
      formData.append(
        "director_passport_photograph",
        data.director_passport_photograph
      );
    }
  } else if (accountType === "individual") {
    if (data.passport_photograph && data.passport_photograph instanceof File) {
      formData.append("passport_photograph", data.passport_photograph);
    }
  }

  // Append all other fields
  Object.entries(data).forEach(([key, value]) => {
    // Skip if it's undefined, null, or we already handled it as a file
    if (
      value === undefined ||
      value === null ||
      key === "director_identity_cards" ||
      key === "identity_cards" ||
      key === "cac_document" ||
      key === "director_passport_photograph" ||
      key === "passport_photograph"
    ) {
      return;
    }

    // Handle booleans
    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
      return;
    }

    // Handle dates
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
      return;
    }

    // Handle arrays (non-file arrays)
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Everything else (strings, numbers)
    formData.append(key, String(value));
  });

  return formData;
};
