import { api } from "@/utils/axios";

const companyGroupLifeBaseUrl = "/public/grouplife/company/register";

export const onboardingApi = {
  companyGroupLifeOnboard: async (companyData: FormData) => {
    const response = await api.post(`${companyGroupLifeBaseUrl}`, companyData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
