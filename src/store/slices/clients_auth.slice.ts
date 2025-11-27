import type {
  ApiResponse,
  Client,
  ClientsAuthState,
  IResetPassword,
  LoginData,
} from "@/interfaces/auth.interface";
import type { ApiError } from "@/types/api-error.type";
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
        state.token = action.payload.token;
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
        state.token = action.payload.token;
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
  },
});

export const { logoutClients } = clientsAuthSlice.actions;
export default clientsAuthSlice.reducer;
