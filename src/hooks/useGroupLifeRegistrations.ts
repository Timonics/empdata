import { groupLifeRegistrationsApi } from "@/api/grouplife";
import { useQuery } from "@tanstack/react-query";

const grouplifeRegKeys = {
  all: ["onboard"] as const,
  lists: () => [...grouplifeRegKeys.all, "list"] as const,
  list: (filters: string) => [...grouplifeRegKeys.lists(), { filters }] as const,
  details: () => [...grouplifeRegKeys.all, "detail"] as const,
  detail: (id: number) => [...grouplifeRegKeys.details(), id] as const,
};

const useGroupLifeRegistrations = () => {
  return useQuery({
    queryKey: grouplifeRegKeys.lists(),
    queryFn: groupLifeRegistrationsApi.getRegistrations,
    select: (data) => data.data,
  });
};

const useGroupLifeRegistration = (companyId: number) => {
  return useQuery({
    queryKey: grouplifeRegKeys.detail(companyId),
    queryFn: () => groupLifeRegistrationsApi.getRegistrationById(companyId),
    select: (data) => data.data,
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export {useGroupLifeRegistration, useGroupLifeRegistrations}