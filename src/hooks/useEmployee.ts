import { adminEmployeeApi } from "@/api/admin";
import { employeeApi } from "@/api/employee";
import type {
  Employee,
  EmployeeResponse,
} from "@/interfaces/employee.interface";
import type { AuthType } from "@/types/auth.types";
import type { CreateEmployee } from "@/types/employee.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (filters: string) => [...employeeKeys.lists(), { filters }] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: number | string) => [...employeeKeys.details(), id] as const,
};

const useCreateEmployee = (authType: AuthType) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (employeeData: CreateEmployee) => {
      return authType === "admin"
        ? adminEmployeeApi.createEmployeeFromAdmin(employeeData)
        : employeeApi.createEmployee(employeeData);
    },

    onMutate: () => {
      const toastId = toast.loading(`Creating Employee`);
      return { toastId };
    },

    onSuccess: (data: EmployeeResponse, _, context) => {
      toast.success(data.message, {
        id: context.toastId,
      });
      query.invalidateQueries({ queryKey: employeeKeys.lists() });
    },

    onError: (error, _, context) => {
      toast.error(error.message || "Failed to create employee", {
        id: context?.toastId,
      });
    },
  });
};

const useEmployees = (authType: AuthType) => {
  return useQuery({
    queryKey: employeeKeys.lists(),
    queryFn:
      authType === "admin"
        ? adminEmployeeApi.getEmployeesFromAdmin
        : employeeApi.getEmployees,
    select: (data: EmployeeResponse) => data.data as Employee[],
  });
};

const useEmployee = (employeeId: number | string, authType: AuthType) => {
  return useQuery({
    queryKey: employeeKeys.detail(employeeId),
    queryFn:
      authType === "admin"
        ? () => adminEmployeeApi.getEmployeeByIdFromAdmin(employeeId)
        : () => employeeApi.getEmployeeById(employeeId),
    select: (data: EmployeeResponse) => data.data as Employee,
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export { useCreateEmployee, useEmployee, useEmployees };
