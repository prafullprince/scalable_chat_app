import { Chat, ChatType, Message, User } from "../../models";

export class ChatRepository {
  // fetch_users
  async fetchUsers(fromUserId: string, toUserId: string) {
    const [fromUser, toUser] = await Promise.all([
      User.findById(fromUserId),
      User.findById(toUserId),
    ]);
    const users = { fromUser, toUser };
    console.log("users: ", users);
    return users;
  }

  // isChatExistsInDb
  async isChatExistsInDb(fromUserId: string, toUserId: string, chatType: string) {
    const isChat = await Chat.findOne({
      participants: {
        $all: [fromUserId, toUserId],
        $size: 2,
      },
      chatType: chatType,
    });
    return isChat;
  }

  // createChatInDb
  async createChatInDb(fromUserId: string, toUserId: string, chatType: string) {
    const chat = await Chat.create({
      participants: [fromUserId, toUserId],
      chatType: chatType,
      createdBy: fromUserId,
    });
    return chat;
  }

  // save msg_in_db
  async saveMsgInDb(chatId: string, sender: string, message: string) {
    const data = await Message.create({
      chat: chatId,
      sender,
      text: message,
    });

    await Chat.findByIdAndUpdate(chatId, {
      $push: {
        messages: data._id
      }
    }, { returnDocument: "after" });
  }
}
