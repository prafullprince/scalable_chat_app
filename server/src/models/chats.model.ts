import { Schema, model, Document, Types } from "mongoose";

export interface IChat extends Document {
  _id: Types.ObjectId;
  chatType: string;
  participants: Types.ObjectId[];
  admins: Types.ObjectId[]; // only relevant for group chats
  groupName?: string;
  groupAvatarUrl?: string;
  groupDescription?: string;
  messages?: Types.ObjectId[];
  lastMessage?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    chatType: { type: String, enum: ["private","group"], required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groupName: { type: String, trim: true },
    groupAvatarUrl: { type: String },
    groupDescription: { type: String, default: "" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", ChatSchema);
