export const validateFiles = (accountType: string, onBoardingData: any) => {
  const errors = [];

  // Validate identity cards
  if (accountType === "corporate" || accountType === "Employee Group Life") {
    const identityCards = onBoardingData?.director_identity_cards || [];
    if (identityCards.length === 0) {
      errors.push("At least one director identity card is required");
    }
  } else if (accountType === "individual") {
    const identityCards = onBoardingData?.identity_cards || [];
    if (identityCards.length === 0) {
      errors.push("At least one identity card is required");
    }
  }

  // Validate CAC document (corporate only)
  if (accountType === "corporate" && !onBoardingData?.cac_document) {
    errors.push("CAC document is required for corporate accounts");
  }

  // Validate passport photograph
  if (accountType === "corporate" || accountType === "Employee Group Life") {
    if (!onBoardingData?.director_passport_photograph) {
      errors.push("Director passport photograph is required");
    }
  } else if (accountType === "individual") {
    if (!onBoardingData?.passport_photograph) {
      errors.push("Passport photograph is required");
    }
  }

  return errors;
};
