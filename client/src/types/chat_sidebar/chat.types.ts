interface ILastMessage {
    message: string;
    date: string;
    isSeen: boolean;
}

export interface IChat {
    chatId: string;
    chatName: string;
    lastMessage: ILastMessage;
    chat_dp: string;
}
