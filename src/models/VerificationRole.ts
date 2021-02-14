import { model, Schema, Document } from "mongoose";

interface IVerificationRole extends Document {
  guildID: string;
  role: string;
}

const VerificationRole = new Schema<IVerificationRole>({
  guildID: { required: true, type: String },
  role: { required: true, type: String },
});

export default model("VerificationRole", VerificationRole);
