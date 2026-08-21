interface ILastMessage {
    message: string;
    date: string;
    isSeen: boolean;
    createdAt: string;
}

export interface IParticipant {
    avatarUrl: string;
    name: string;
    _id: string;
}

export interface IChat {
    _id: string;
    chatName?: string;
    lastMessage: ILastMessage;
    chat_dp: string;
    participants: IParticipant[];
    chatType: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
}

export interface IMessage {
    type: string;
    _id: string;
    createdAt: Date;
    text: string;
    sender: string;
    updatedAt: Date;
}
