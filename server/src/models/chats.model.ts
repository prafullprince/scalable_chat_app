import { Schema, model, Document, Types } from "mongoose";
import { ChatType } from "./types.model";

export interface IChat extends Document {
  _id: Types.ObjectId;
  type: ChatType;
  participants: Types.ObjectId[];
  admins: Types.ObjectId[]; // only relevant for group chats
  groupName?: string;
  groupAvatarUrl?: string;
  groupDescription?: string;
  lastMessage?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    type: { type: String, enum: ["private","group"], required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groupName: { type: String, trim: true },
    groupAvatarUrl: { type: String },
    groupDescription: { type: String, default: "" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", ChatSchema);
