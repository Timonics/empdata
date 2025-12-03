import type { CreateEmployee } from "@/types/employee.type";
import { api } from "@/utils/axios";

const employeeBaseUrl = "/portal/employees";

export const employeeApi = {
  createEmployee: async (employeeData: CreateEmployee) => {
    const response = await api.post(`${employeeBaseUrl}`, employeeData, {
      headers: {
        "x-auth-type": "company",
      },
    });
    return response.data;
  },

  getEmployees: async () => {
    const response = await api.get(`${employeeBaseUrl}`, {
      headers: {
        "x-auth-type": "company",
      },
    });
    return response.data;
  },

  getEmployeeById: async (employeeId: number) => {
    const response = await api.get(`${employeeBaseUrl}/${employeeId}`, {
      headers: {
        "x-auth-type": "company",
      },
    });
    return response.data;
  },
};
