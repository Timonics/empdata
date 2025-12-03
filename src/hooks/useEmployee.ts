import { adminEmployeeApi } from "@/api/admin";
import type {
  Employee,
  EmployeeResponse,
} from "@/interfaces/employee.interface";
import type { CreateEmployee } from "@/types/employee.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (filters: string) => [...employeeKeys.lists(), { filters }] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

const useCreateEmployee = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (employeeData: CreateEmployee) =>
      adminEmployeeApi.createEmployeeFromAdmin(employeeData),

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

const useEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.lists(),
    queryFn: adminEmployeeApi.getEmployeesFromAdmin,
    select: (data: EmployeeResponse) => data.data as Employee[],
  });
};

const useEmployee = (employeeId: number) => {
  return useQuery({
    queryKey: employeeKeys.details(),
    queryFn: () => adminEmployeeApi.getEmployeeByIdFromAdmin(employeeId),
  });
};

export { useCreateEmployee, useEmployee, useEmployees };
