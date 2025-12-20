import { encryptData } from "@/utils/encrypt";

export const encryptOnboardingPayload = async (payload: any) => {
  if (payload.director_bvn_number) {
    const enc = await encryptData(
      "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      payload.director_bvn_number
    );

    payload.director_bvn_data = enc.data;
    payload.director_bvn_iv = enc.iv;
    payload.director_bvn_tag = enc.tag;

    delete payload.director_bvn_number;
  }

  return payload;
};
