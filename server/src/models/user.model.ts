import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  phoneNumber?: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  about: string;
  isOnline: boolean;
  lastSeen: Date;
  contacts: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, unique: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      required: true
    },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    about: { type: String, default: "Hey there! I am using WhatsApp Clone." },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

// UserSchema.index({ name: "text", email: "text" });
export const User = model<IUser>("User", UserSchema);
