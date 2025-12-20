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
  status?: "pending" | "approved" | "invited" | "active" | "verified" | "rejected";
  updatedAt?: string;
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
      // Add timestamp if not provided
      const recordWithTimestamps = {
        ...action.payload,
        createdAt: action.payload.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: action.payload.status || "pending",
      };
      state.records.unshift(recordWithTimestamps); // newest first
    },

    updateRegistration: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<RegistrationRecord["data"]> & {
          status?: RegistrationRecord["status"];
        };
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id
      );
      if (record) {
        // Update data object
        Object.assign(record.data, action.payload.updates);
        
        // Update status if provided
        if (action.payload.updates.status) {
          record.status = action.payload.updates.status;
        }
        
        // Update timestamp
        record.updatedAt = new Date().toISOString();
      }
    },

    updateRegistrationStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: RegistrationRecord["status"];
        notes?: string;
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id
      );
      if (record) {
        record.status = action.payload.status;
        record.updatedAt = new Date().toISOString();
      }
    },

    // Individual-specific update
    updateIndividualRegistration: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<IndividualOnboarding>;
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id && r.type === "individual"
      );
      if (record) {
        Object.assign(record.data, action.payload.updates);
        record.updatedAt = new Date().toISOString();
      }
    },

    // Company-specific update
    updateCompanyRegistration: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<CompanyGroupLifeOnboarding>;
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id && r.type === "company"
      );
      if (record) {
        Object.assign(record.data, action.payload.updates);
        record.updatedAt = new Date().toISOString();
      }
    },

    // Update specific fields safely
    updateRegistrationField: (
      state,
      action: PayloadAction<{
        id: string;
        field: string;
        value: any;
        type?: RegistrationType; // Optional type check
      }>
    ) => {
      const record = state.records.find(
        (r) => r.id === action.payload.id && 
               (!action.payload.type || r.type === action.payload.type)
      );
      if (record) {
        // Use type-safe update based on record type
        if (action.payload.field in record.data) {
          (record.data as any)[action.payload.field] = action.payload.value;
          record.updatedAt = new Date().toISOString();
        }
      }
    },

    // Remove registration
    removeRegistration: (
      state,
      action: PayloadAction<string>
    ) => {
      state.records = state.records.filter(
        (r) => r.id !== action.payload
      );
    },

    // Set all registrations (useful for initial load)
    setRegistrations: (
      state,
      action: PayloadAction<RegistrationRecord[]>
    ) => {
      state.records = action.payload;
    },

    // Clear all registrations
    clearRegistrations: (state) => {
      state.records = [];
    },
  },
});

export const {
  addRegistration,
  updateRegistration,
  updateRegistrationStatus,
  updateIndividualRegistration,
  updateCompanyRegistration,
  updateRegistrationField,
  removeRegistration,
  setRegistrations,
  clearRegistrations,
} = registrationsSlice.actions;

export default registrationsSlice.reducer;