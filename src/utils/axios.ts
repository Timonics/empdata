import { API_URL } from "@/utils/db_Url";
import axios from "axios";
import { normalizeError } from "./normalizeError";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

let _store: any = null;

export const setStore = (store: any) => {
  _store = store;
};

api.interceptors.request.use(
  (config) => {
    const authType = config.headers["x-auth-type"];

    console.log("Interceptor - x-auth-type:", authType);
    console.log("Interceptor - All headers:", config.headers);

    if (authType && _store) {
      const state = _store.getState();
      let token: string | null = null;

      switch (authType) {
        case "admin":
          token = state.adminAuth.token;
          break;
        case "company":
          token = state.clientsAuth.token;
          break;
        case "employee":
          token = state.clientsAuth.token;
          break;
        default:
          token = null;
      }
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
