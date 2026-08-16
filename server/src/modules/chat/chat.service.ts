import { ChatRepository } from "./chat.repository";
import { ChatMessage, ModifiedChatMessage } from "../../redis/types";
import { CreatePrivateChatDto, FetchChatDetailsDto } from "./chat.validation";
import { ApiError } from "../../utils/apiError.utils";

export class ChatService {
  private repo = new ChatRepository();

  // ---------create_private_chat----------
  async create_private_chat(
    input: CreatePrivateChatDto,
    fromUserEmail: string,
  ) {
    // participants
    const users = await this.repo.fetchUsers(fromUserEmail, input.toUserEmail);
    if (!users.fromUser || !users.toUser) {
      throw new ApiError(404 ,"User not found. Send Invitation....");
    }

    // check isChat Exist
    let chat = await this.repo.isChatExistsInDb(
      users.fromUser._id.toString(),
      users.toUser._id.toString(),
      input.chatType,
    );
    if (chat) {
      throw new ApiError(409, "Chat Already Exist");
    }

    // create new one
    chat = await this.repo.createChatInDb(
      users.fromUser._id.toString(),
      users.toUser._id.toString(),
      input.chatType,
    );

    return { chatId: chat._id, otherUserId: users.toUser._id };
  }

  // --------add msg in db from queue--------
  async addMsgInDb(data: ModifiedChatMessage) {
    const { text, chatId, sender, receiver, messageType, chatType, _id, createdAt, updatedAt } = data;

    // check is chat exists
    const isChat = await this.repo.isChatExistsInDb(sender, receiver, chatType);
    if (!isChat) {
      console.log("chat",isChat)
      return;
    }

    // save msg in db & update chat
    await this.repo.saveMsgInDb(chatId, sender, text, _id, createdAt, updatedAt);
  }

  // _______fetch_all_chats________
  async fetch_all_chats(userId: string) {
    // isUser exist
    const user = await this.repo.findUser(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // fetch chats
    const all_chats = await this.repo.fetch_chats(user._id);
    return all_chats;
  }

  // _______fetch_messages_______
  async fetchMessages(input: FetchChatDetailsDto) {
    if(!input.before) {
      // if cursor is null
      // fetch messages of initial time
      const messages = await this.repo.fetchInitialMessages(input.chatId);
      const hasmore = messages.length > 20;
      const nextCursor = messages[0]?.createdAt;
      return { messages, hasmore, nextCursor };
    }

    const messages = await this.repo.fetchOlderMessages(input.chatId, input.before);
    const hasmore = messages.length > 20;
    const nextCursor = messages[0]?.createdAt;
    return { messages, hasmore, nextCursor };
  }
}
