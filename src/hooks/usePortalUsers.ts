import { portalUsersApi } from "@/api/portalUsers";
import type { ResendInvResponse } from "@/interfaces/portal_users.interface";
import type { PortalUserId } from "@/types/portal_user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  const query = useQueryClient();

  return useMutation({
    mutationFn: (portalUser: PortalUserId) =>
      portalUsersApi.resendInvitation(portalUser),

    onMutate: () => {
      const toastId = toast.loading(`Resending invitation`);
      return { toastId };
    },

    onSuccess: (data: ResendInvResponse, _, context) => {
      toast.success(data.message, {
        id: context.toastId,
      });
      query.invalidateQueries({ queryKey: portalUsersKeys.lists() });
    },

    onError: (error, _, context) => {
      toast.error(error.message || "Failed to resend invitation", {
        id: context?.toastId,
      });
    },
  });
};

export { usePortalUsers, usePortalUser, useResendInvitation };
