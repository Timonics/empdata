import { useResendInvitation } from "@/hooks/usePortalUsers";
import { Loader2 } from "lucide-react";
import React from "react";

type IProps = {
  portalUserId: number;
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
        className="absolute inset-0 backdrop-blur-lg rounded-xl z-10"
        onClick={() => setShowResendPortalUserInvite(false)}
      />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full flex flex-col gap-4 items-center justify-center rounded-lg bg-white shadow-2xl h-[200px]">
        {resendInvite.isPending ? (
          <div className="flex items-center gap-2 text-xl">
            <Loader2 className="animate-spin" />
            Resending Invite...
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Resend Invite</h2>
            <p className="flex items-center gap-6">
              <button
                onClick={() => setShowResendPortalUserInvite(false)}
                className="px-4 py-2 rounded-lg border border-muted-foreground transition duration-300 hover:scale-105 hover:text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-black text-sky-400 transition duration-300 hover:scale-105 hover:bg-sky-400 hover:text-black"
              >
                Resend
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResendInvite;
