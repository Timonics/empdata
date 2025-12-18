import { api } from "@/utils/axios";

const groupLifeBaseUrl = "/admin/grouplife/company-registrations";

export const groupLifeRegistrationsApi = {
  getRegistrations: async () => {
    const response = await api.get(`${groupLifeBaseUrl}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getPendingRegistrations: async () => {
    const response = await api.get(`${groupLifeBaseUrl}/pending`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getRegistrationById: async (registrationId: number) => {
    const response = await api.get(`${groupLifeBaseUrl}/${registrationId}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  approveRegistration: async (registrationId: number) => {
    const response = await api.post(`${groupLifeBaseUrl}/${registrationId}/approve`, {
        
    }, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  updateRegistration: async (registrationId: number) => {
    const response = await api.put(`${groupLifeBaseUrl}/${registrationId}`, {}, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },
};
