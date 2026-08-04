import { Schema, model, Document, Types } from "mongoose";

export interface IStatus extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  mediaUrl: string;
  caption?: string;
  viewers: Types.ObjectId[];
  expiresAt: Date;
  createdAt: Date;
}

const StatusSchema = new Schema<IStatus>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mediaUrl: { type: String, required: true },
    caption: { type: String, trim: true },
    viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h TTL
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Auto-delete expired statuses
StatusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Status = model<IStatus>("Status", StatusSchema);
