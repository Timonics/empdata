import { useResendInvitation } from "@/hooks/usePortalUsers";
import { Loader2 } from "lucide-react";
import React from "react";

type IProps = {
  portalUserId: number | string;
  setShowResendPortalUserInvite: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResendInvite: React.FC<IProps> = ({
  portalUserId,
  setShowResendPortalUserInvite,
}) => {
  const resendInvite = useResendInvitation();

  const handleSubmit = async () => {
    await resendInvite.mutateAsync({ portal_user_id: portalUserId });
  };

  if (resendInvite.isSuccess && !resendInvite.isPending) {
    setShowResendPortalUserInvite(false);
  }

  return (
    <div>
      <div
        className="absolute inset-0 backdrop-blur-lg"
        onClick={() => setShowResendPortalUserInvite(false)}
      />

      <div className="absolute left-1/2 top-1/2 p-4 py-6 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full flex flex-col gap-6 items-center justify-center rounded-lg border-2 border-black/5 bg-white shadow-2xl min-h-[250px]">
        {resendInvite.isPending ? (
          <div className="flex items-center gap-2 text-xl">
            <Loader2 className="animate-spin" />
            Resending Invite...
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold">
              Invite to Create an Account
            </h2>

            <label className="space-y-1 w-full">
              <h6 className="text-black/75 text-sm">Email Address</h6>{" "}
              <input
                type=""
                placeholder="Enter email address to send invite"
                className="border rounded-sm border-black/10 w-full p-2 px-4  focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-transparent placeholder:text-sm"
              />
            </label>
            <p className="flex items-center gap-6">
              <button
                onClick={() => setShowResendPortalUserInvite(false)}
                className="px-8 py-2 rounded-lg border border-black/10 transition duration-300 hover:scale-105 font-medium hover:text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-10 py-2 rounded-lg bg-black text-sky-400 transition duration-300 hover:scale-105 hover:bg-sky-400 hover:text-black font-medium"
              >
                Invite
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResendInvite;
