import { ChatType } from "../models";

// chat messages
export type ChatMessage = {
    type: string;
    message: string;
    chatId: string;
    sender: string;
    messageType: string;
    chatType: ChatType;
    receiver: string;
}
