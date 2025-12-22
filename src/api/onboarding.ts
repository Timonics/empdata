import { api } from "@/utils/axios";

const companyGroupLifeBaseUrl = "/public/grouplife";

export const onboardingApi = {
  fetchCompaniesRegisteredGroupLife: async () => {
    const response = await api.get(`${companyGroupLifeBaseUrl}/companies`);
    return response.data;
  },

  companyGroupLifeOnboard: async (companyData: FormData) => {
    const response = await api.post(
      `${companyGroupLifeBaseUrl}/company/register`,
      companyData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
