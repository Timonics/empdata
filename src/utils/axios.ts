import { API_URL } from "@/utils/db_Url";
import axios from "axios";
import { normalizeError } from "./normalizeError";
import { getAuthToken } from "./authToken";
import type { AuthType } from "@/types/auth.types";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authType = config.headers["x-auth-type"];

    console.log("Interceptor - x-auth-type:", authType);
    console.log("Interceptor - All headers:", config.headers);

    if (authType) {
      const token = getAuthToken(authType as AuthType);

      console.log(token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      delete config.headers["x-auth-type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      return {
        success: false,
        status: error.response.status,
        message: "Server Error",
      };
    }
    const normalized = normalizeError(error);
    return Promise.reject(normalized);
  }
);
