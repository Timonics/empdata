import { onboardingApi } from "@/api/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CompanyResponse } from "@/interfaces/company.interface";

const onboardKeys = {
  all: ["onboard"] as const,
  lists: () => [...onboardKeys.all, "list"] as const,
  list: (filters: string) => [...onboardKeys.lists(), { filters }] as const,
  details: () => [...onboardKeys.all, "detail"] as const,
  detail: (id: number) => [...onboardKeys.details(), id] as const,
};

const useOnboardGroupLifeCompany = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (companyData: FormData) =>
      onboardingApi.companyGroupLifeOnboard(companyData),

    onMutate: () => {
      const toastId = toast.loading(
        `Onboarding Company`
      );
      return { toastId };
    },

    onSuccess: (data: CompanyResponse, _, context) => {
      toast.success(data.message, {
        id: context.toastId,
      });
      query.invalidateQueries({ queryKey: onboardKeys.lists() });
    },

    onError: (error, _, context) => {
      toast.error(error.message || "Failed to onboard company", {
        id: context?.toastId,
      });
    },
  });
};

export { useOnboardGroupLifeCompany };
