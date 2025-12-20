import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CompanyGroupLifeOnboarding,
  IndividualOnboarding,
} from "@/types/onboarding.type";

export type RegistrationType = "company" | "individual";

export type RegistrationRecord = {
  id: string;
  type: RegistrationType;
  createdAt: string;
  data: CompanyGroupLifeOnboarding | IndividualOnboarding;
};

type RegistrationsState = {
  records: RegistrationRecord[];
};

const initialState: RegistrationsState = {
  records: [],
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    addRegistration: (
      state,
      action: PayloadAction<RegistrationRecord>
    ) => {
      state.records.unshift(action.payload); // newest first
    },

    updateRegistrationStatus: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<CompanyGroupLifeOnboarding>;
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id
      );
      if (record && record.type === "company") {
        Object.assign(record.data, action.payload.updates);
      }
    },
  },
});

export const {
  addRegistration,
  updateRegistrationStatus,
} = registrationsSlice.actions;

export default registrationsSlice.reducer;
