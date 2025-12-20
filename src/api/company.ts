import type { CreateCompany } from "@/types/company.type";
import { api } from "@/utils/axios";

const companyBaseUrl = "/admin/companies";

export const companyApi = {
  createCompany: async (companyData: CreateCompany) => {
    const response = await api.post(`${companyBaseUrl}`, companyData, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getCompanies: async () => {
    const response = await api.get(`${companyBaseUrl}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getCompanyById: async (companyId: number | string) => {
    const response = await api.get(`${companyBaseUrl}/${companyId}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },
};
