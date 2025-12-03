import type { CreateEmployee } from "@/types/employee.type";
import { api } from "@/utils/axios";

const employeeBaseUrl = "/portal/employees";

export const adminEmployeeApi = {
  createEmployeeFromAdmin: async (employeeData: CreateEmployee) => {
    const response = await api.post(`${employeeBaseUrl}`, employeeData, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getEmployeesFromAdmin: async () => {
    const response = await api.get(`${employeeBaseUrl}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getEmployeeByIdFromAdmin: async (employeeId: number) => {
    const response = await api.get(`${employeeBaseUrl}/${employeeId}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },
};
