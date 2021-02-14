import VerificationRole from "../models/VerificationRole";

export const getVerificationRole = async (guildID: string) => {
  const result = await VerificationRole.findOne({
    guildID: guildID,
  });

  if (result) {
    return result.role;
  } else {
    return null;
  }
};
