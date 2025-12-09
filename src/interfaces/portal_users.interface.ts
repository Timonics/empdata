export interface ResendInvResponse {
  success: boolean;
  message: string;
  data: {
    invitation_sent_at: string;
  };
}
