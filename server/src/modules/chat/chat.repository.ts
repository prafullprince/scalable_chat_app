import { Chat, ChatType, User } from "../../models";

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

  // isChatExists
  async isChatExists(fromUserId: string, toUserId: string, chatType: ChatType) {
    const isChat = await Chat.findOne({
        participants: {
            $all: [fromUserId, toUserId], $size:2
        },
        type: chatType
    })
    return isChat;
  }

  // createChat
  async createChat(fromUserId: string, toUserId: string, chatType: ChatType) {
    const chat = await Chat.create({
      participants: [fromUserId, toUserId],
      type: chatType,
      createdBy: fromUserId
    });
    return chat;
  }
}
