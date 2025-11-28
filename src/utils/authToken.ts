import type { AuthType } from "@/types/auth.types";
import { store } from "@/store/store";

export const getAuthToken = (type: AuthType): string | null => {
  const state = store.getState();

  switch (type) {
    case "admin":
      return state.adminAuth.token;
    case "company":
      return state.clientsAuth.token;
    case "employee":
      return state.clientsAuth.token;
    default:
      return null;
  }
};
