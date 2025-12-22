import type { CompanyGroupLifeOnboarding } from "@/types/onboarding.type";

export type DisplayStatus =
  | "pending"
  | "approved"
  | "invited"
  | "active"
  | "verified"
  | "rejected"
  | "--";

export const getDisplayStatus = (
  data: CompanyGroupLifeOnboarding
): DisplayStatus => {
  if (data.status === "rejected") return "rejected";

  if (data.verification_status === "verified") return "verified";

  if (data.status === "pending_approval") return "pending";

  if (data.status === "approved") {
    if (data.account_status === "pending") return "approved";
    if (data.account_status === "invited") return "invited";
    if (data.account_status === "active") return "active";
  }

  return "--";
};

export const getActions = (
  data: CompanyGroupLifeOnboarding
): {
  canApprove?: boolean;
  canReject?: boolean;
  canSendInvite?: boolean;
  canResendInvite?: boolean;
  canVerify?: boolean;
  canView: boolean;
} => {
  if (data.status === "pending-approval") {
    return {
      canApprove: true,
      canReject: true,
      canView: true,
    };
  }

  if (data.status === "approved" && data.account_status === "pending") {
    return {
      canSendInvite: true,
      canView: true,
    };
  }

  if (data.status === "approved" && data.account_status === "invited") {
    return {
      canResendInvite: true,
      canView: true,
    };
  }

  if (data.status === "approved" && data.account_status === "active") {
    return {
      canVerify: true,
      canView: true,
    };
  }

  // verified or rejected
  return {
    canView: true,
  };
};