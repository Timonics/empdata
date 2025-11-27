import { companyApi } from "@/api/company";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//Query keys factory pattern
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
    mutationFn: companyApi.createCompany,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: companyKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating company:", error);
    },
  });
};

const useCompanies = () => {
  return useQuery({
    queryKey: companyKeys.lists(),
    queryFn: companyApi.getCompanies,
  });
};

const useCompany = (companyId: number) => {
  return useQuery({
    queryKey: companyKeys.details(),
    queryFn: () => companyApi.getCompanyById(companyId),
  });
};

export { useCreateCompany, useCompanies, useCompany };
