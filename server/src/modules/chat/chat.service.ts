import { ChatRepository } from "./chat.repository";
import { ChatMessage } from "../../redis/types";
import { CreatePrivateChatDto } from "./chat.validation";

export class ChatService {
  private repo = new ChatRepository();

  // ---------create_private_chat----------
  async create_private_chat(input: CreatePrivateChatDto) {
    // participants
    const users = await this.repo.fetchUsers(input.fromUserId, input.toUserId);
    if (!users.fromUser || !users.toUser) {
      throw new Error("User not found in db");
    }

    // check isChat Exist
    let chat = await this.repo.isChatExistsInDb(
      input.fromUserId,
      input.toUserId,
      input.chatType,
    );
    if (!chat) {
      // create new one
      chat = await this.repo.createChatInDb(
        input.fromUserId,
        input.toUserId,
        input.chatType,
      );
    }
    return chat._id;
  }

  // --------add msg in db from queue--------
  async addMsgInDb(data: ChatMessage) {
    const { message, chatId, sender, receiver, messageType, chatType } = data;

    // check is chat exists
    const isChat = await this.repo.isChatExistsInDb(sender, receiver, chatType);
    if (!isChat) {
      return;
    }

    // save msg in db & update chat
    await this.repo.saveMsgInDb(chatId, sender, message);
  }
}
