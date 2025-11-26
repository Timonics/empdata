import type {
  ApiResponse,
  AuthState,
  LoginData,
  IResetPassword,
} from "@/interfaces/auth.interface";
import type { ApiError } from "@/types/api-error.type";
import { setAdminAuthToken } from "@/utils/authToken";
import { api } from "@/utils/axios";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const adminInitialState: AuthState = {
  authData: null,
  isAuthenticated: false,
  token: null,
  expiresAt: null,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk<
  ApiResponse,
  LoginData,
  { rejectValue: ApiError }
>("adminLogin", async (loginData: LoginData, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", loginData, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err as ApiError);
  }
});

export const adminForgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await api.post(
        "/auth/forgot-password",
        { email },
        {
          headers: {
            "x-auth-type": "admin",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (resetData: IResetPassword, thunkAPI) => {
    try {
      const response = await api.post("/auth/reset-password", resetData, {
        headers: {
          "x-auth-type": "admin",
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuthSlice",
  initialState: adminInitialState,
  reducers: {
    logoutAdmin: (state) => {
      state.authData = null;
      state.isAuthenticated = false;
      state.token = null;
      state.expiresAt = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login Cases
    builder.addCase(loginAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      loginAdmin.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.authData = action.payload.data?.user || null;
        state.expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload.token;
        setAdminAuthToken(action.payload.token);
      }
    );

    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Login failed";
      }
    });

    // Forgot Password Cases
    builder.addCase(adminForgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      adminForgotPassword.fulfilled,
      (state, _: PayloadAction<Omit<ApiResponse, "data" | "token">>) => {
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(adminForgotPassword.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Request failed";
      }
    });

    //Reset Password Cases
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      resetPassword.fulfilled,
      (state, _: PayloadAction<Omit<ApiResponse, "data" | "token">>) => {
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as ApiError;
      } else {
        state.error = action.error.message || "Request failed";
      }
    });
  },
});

export const { logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
