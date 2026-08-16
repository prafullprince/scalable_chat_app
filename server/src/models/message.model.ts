import { Schema, model, Document, Types } from "mongoose";
import { MessageStatus, MessageType } from "./types.model";

interface IMessageStatusEntry {
  user: Types.ObjectId;
  status: MessageStatus;
  updatedAt: Date;
}

export interface IMessage extends Document {
  _id: Types.ObjectId;
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  type: MessageType;
  text?: string;
  mediaUrl?: string;
  fileName?: string;
  location?: { lat: number; lng: number };
  replyTo?: Types.ObjectId;
  statuses: IMessageStatusEntry[];
  deletedFor: Types.ObjectId[];
  isDeletedForEveryone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageStatusEntrySchema = new Schema<IMessageStatusEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: Object.values(MessageStatus), default: MessageStatus.SENT },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const MessageSchema = new Schema<IMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: Object.values(MessageType), default: MessageType.TEXT },
    text: { type: String, trim: true },
    mediaUrl: { type: String },
    fileName: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    statuses: [MessageStatusEntrySchema],
    deletedFor: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeletedForEveryone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MessageSchema.index({ chat: 1, createdAt: -1 });
export const Message = model<IMessage>("Message", MessageSchema);
