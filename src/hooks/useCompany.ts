import { companyApi } from "@/api/company";
import type { Company, CompanyResponse } from "@/interfaces/company.interface";
import type { CreateCompany } from "@/types/company.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (filters: string) => [...companyKeys.lists(), { filters }] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: number) => [...companyKeys.details(), id] as const,
};

const useCreateCompany = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (companyData: CreateCompany) =>
      companyApi.createCompany(companyData),

    onMutate: (variables) => {
      const toastId = toast.loading(
        `Creating ${variables.company_name} Company`
      );
      return { toastId };
    },

    onSuccess: (data: CompanyResponse, _, context) => {
      toast.success(data.message, {
        id: context.toastId,
      });
      query.invalidateQueries({ queryKey: companyKeys.lists() });
    },

    onError: (error, _, context) => {
      toast.error(error.message || "Failed to create company", {
        id: context?.toastId,
      });
    },
  });
};

const useCompanies = () => {
  return useQuery({
    queryKey: companyKeys.lists(),
    queryFn: companyApi.getCompanies,
    select: (data: CompanyResponse) => data.data as Company[],
  });
};

const useCompany = (companyId: number) => {
  return useQuery({
    queryKey: companyKeys.detail(companyId),
    queryFn: () => companyApi.getCompanyById(companyId),
    select: (data: CompanyResponse) => data.data as Company,
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export { useCreateCompany, useCompanies, useCompany };
