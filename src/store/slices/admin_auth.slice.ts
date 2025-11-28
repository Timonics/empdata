import type {
  ApiResponse,
  AuthState,
  LoginData,
  IResetPassword,
  User,
} from "@/interfaces/auth.interface";
import type { ApiError } from "@/types/api-error.type";
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
  ApiResponse<User>,
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

export const adminResetPassword = createAsyncThunk(
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
      (state, action: PayloadAction<ApiResponse<User>>) => {
        state.loading = false;
        state.authData = action.payload.data?.user || null;
        state.expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload.data ? action.payload.data.token : null;
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
      (state, _: PayloadAction<Omit<ApiResponse<User>, "data">>) => {
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
    builder.addCase(adminResetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      adminResetPassword.fulfilled,
      (state, _: PayloadAction<Omit<ApiResponse<User>, "data">>) => {
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(adminResetPassword.rejected, (state, action) => {
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
