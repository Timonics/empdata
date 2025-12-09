import type {
  ApiResponse,
  Client,
  ClientsAuthState,
  IResetPassword,
  LoginData,
  NINResponse,
} from "@/interfaces/auth.interface";
import type { ApiError } from "@/types/api-error.type";
import type { VerifyNIN } from "@/types/employee.type";
import { api } from "@/utils/axios";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: ClientsAuthState = {
  clientsAuthData: null,
  isAuthenticated: false,
  token: null,
  expiresAt: null,
  loading: false,
  error: null,
};

export const loginCompany = createAsyncThunk(
  "clientLogin",
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await api.post("/portal/auth/login", loginData, {
        headers: {
          "x-auth-type": "company",
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginEmployee = createAsyncThunk(
  "employeeLogin",
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await api.post("/portal/auth/login", loginData, {
        headers: {
          "x-auth-type": "employee",
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const setPassword = createAsyncThunk(
  "setPassword",
  async (setPasswordData: IResetPassword, thunkAPI) => {
    try {
      const response = await api.post(
        "/portal/auth/set-password",
        setPasswordData
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const verifyNIN = createAsyncThunk(
  "verifyNIN",
  async (params: { employeeId: number; ninData: VerifyNIN }, thunkAPI) => {
    try {
      const response = await api.post(
        `/portal/employees/${params.employeeId}/submit-nin`,
        params.ninData,
        {
          headers: {
            "x-auth-type": "employee",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const clientsAuthSlice = createSlice({
  name: "clientsAuth",
  initialState,
  reducers: {
    logoutClients(state) {
      state.clientsAuthData = null;
      state.isAuthenticated = false;
      state.token = null;
      state.expiresAt = null;
      state.loading = false;
      state.error = null;
    },
    updateNINVerification(state, action: PayloadAction<boolean>) {
      if (state.clientsAuthData?.nin_verification) {
        state.clientsAuthData.nin_verification.is_nin_verified = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Company login cases
    builder.addCase(loginCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      loginCompany.fulfilled,
      (state, action: PayloadAction<ApiResponse<Client>>) => {
        state.loading = false;
        state.clientsAuthData = action.payload.data?.user || null;
        state.isAuthenticated = true;
        state.token = action.payload.data ? action.payload.data.token : null;
        state.expiresAt = Date.now() + 60 * 60 * 1000;
      }
    );
    builder.addCase(loginCompany.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Login failed";
      }
    });

    // Employee login cases
    builder.addCase(loginEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginEmployee.fulfilled,
      (state, action: PayloadAction<ApiResponse<Client>>) => {
        state.loading = false;
        state.clientsAuthData = action.payload.data?.user || null;
        state.isAuthenticated = true;
        state.token = action.payload.data ? action.payload.data.token : null;
        state.expiresAt = Date.now() + 60 * 60 * 1000;
      }
    );
    builder.addCase(loginEmployee.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Login failed";
      }
    });

    // Set Password cases
    builder.addCase(setPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      setPassword.fulfilled,
      (
        state,
        _: PayloadAction<Omit<ApiResponse<Client>, "data" | "token">>
      ) => {
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(setPassword.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Request failed";
      }
    });

    //verify NIN Cases
    builder.addCase(verifyNIN.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      verifyNIN.fulfilled,
      (state, action: PayloadAction<NINResponse>) => {
        state.loading = false;
        if (action.payload.data?.is_nin_verified) {
          if (state.clientsAuthData?.nin_verification) {
            state.clientsAuthData.nin_verification.is_nin_verified =
              action.payload.data.is_nin_verified;
          }
        }
      }
    );

    builder.addCase(verifyNIN.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as ApiError) ||
        action.error.message ||
        "NIN verification failed";
    });
  },
});

export const { logoutClients } = clientsAuthSlice.actions;
export default clientsAuthSlice.reducer;
