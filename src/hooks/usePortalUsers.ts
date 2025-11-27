import { portalUsersApi } from "@/api/portalUsers";
import { useMutation, useQuery } from "@tanstack/react-query";

const portalUsersKeys = {
  all: ["portalUsers"] as const,
  lists: () => [...portalUsersKeys.all, "list"] as const,
  list: (filters: string) => [...portalUsersKeys.lists(), { filters }] as const,
  details: () => [...portalUsersKeys.all, "detail"] as const,
  detail: (id: number) => [...portalUsersKeys.details(), id] as const,
};

const usePortalUsers = () => {
  return useQuery({
    queryKey: portalUsersKeys.lists(),
    queryFn: portalUsersApi.getPortalUsers,
  });
};

const usePortalUser = (userId: number) => {
  return useQuery({
    queryKey: portalUsersKeys.detail(userId),
    queryFn: () => portalUsersApi.getPortalUserById(userId),
  });
};

const useResendInvitation = () => {
  return useMutation({
    mutationFn: portalUsersApi.resendInvitation,
  });
};

export { usePortalUsers, usePortalUser, useResendInvitation };
