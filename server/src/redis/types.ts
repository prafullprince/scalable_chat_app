import { Types } from 'mongoose';
// chat messages
export type ChatMessage = {
    type: string;
    message: string;
    chatId: string;
    sender: string;
    messageType: string;
    chatType: string;
    receiver: string;
}

export type ModifiedChatMessage = {
    type: string;
    _id: Types.ObjectId;
    createdAt: Date;
    text: string;
    chatId: string;
    sender: string;
    messageType: string;
    chatType: string;
    receiver: string;
    updatedAt: Date;
}

// online
