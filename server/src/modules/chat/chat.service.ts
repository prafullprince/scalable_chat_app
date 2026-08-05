import { WebSocket } from "ws";
import { ChatRepository } from "./chat.repository";
import { ChatType, Message } from "../../models";
import { ChatMessage } from "../../redis/types";
import { ApiError } from "../../utils/apiError.utils";

export class ChatService {
    private repo = new ChatRepository();

    // ---------create_chat--------₹
    async join_chat(fromUserId: string, toUserId: string, chatType: string, socket: WebSocket, groupName?: string, groupDescription?: string) {        
        if(chatType === ChatType.PRIVATE) {
            // validation
            if(!fromUserId || !toUserId || !chatType || !socket) {
                return socket.send("Validation failed for private chat join");
            }

            // participants
            const users = await this.repo.fetchUsers(fromUserId, toUserId);
            if(!users.fromUser || !users.toUser) {
                socket.send("User not found");
            }

            // check isChat Exist
            let chat = await this.repo.isChatExists(fromUserId, toUserId, chatType);
            if(!chat) {
                // create new one
                chat = await this.repo.createChat(fromUserId, toUserId, chatType);
            }
            return chat._id;
        }
    }

    // --------add msg in db from queue--------
    async addMsgInDb(data: ChatMessage) {
        const { message, chatId, sender, receiver, messageType, chatType } = data;

        // check is chat exists
        const isChat = await this.repo.isChatExists(sender, receiver, chatType);
        if(!isChat) {
            return;
        }

        // save msg in db & update chat
        await this.repo.saveMsgInDb(chatId, sender, message);
    }
}
