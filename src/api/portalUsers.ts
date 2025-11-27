import type { PortalUserId } from "@/types/portal_user.type";
import { api } from "@/utils/axios";

const portalUsersBaseUrl = "/admin/portal-users";

export const portalUsersApi = {
  getPortalUsers: async () => {
    const response = await api.get(`${portalUsersBaseUrl}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  getPortalUserById: async (userId: number) => {
    const response = await api.get(`${portalUsersBaseUrl}/${userId}`, {
      headers: {
        "x-auth-type": "admin",
      },
    });
    return response.data;
  },

  resendInvitation: async (portalUser: PortalUserId) => {
    const response = await api.post(
      `${portalUsersBaseUrl}/resend-invitation`,
      portalUser,
      {
        headers: {
          "x-auth-type": "admin",
        },
      }
    );
    return response.data;
  },
};
