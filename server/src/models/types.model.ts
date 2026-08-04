import { Types } from "mongoose";

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
  LOCATION = "location",
  CONTACT = "contact",
}

export enum MessageStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
}

export enum ChatType {
  PRIVATE = "private",
  GROUP = "group",
}

export type ObjectId = Types.ObjectId;
