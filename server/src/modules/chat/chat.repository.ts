import { Chat, Message, User } from "../../models";
import { Types } from 'mongoose';

export class ChatRepository {
  // fetch_users
  async fetchUsers(fromUserEmail: string, toUserEmail: string) {
    const [fromUser, toUser] = await Promise.all([
      User.findOne({ email: fromUserEmail }),
      User.findOne({ email: toUserEmail }),
    ]);
    const users = { fromUser, toUser };
    return users;
  }

  // fetch_user_by_userId
  async findUser(userId: string) {
    const user = await User.findById(userId);
    return user;
  }

  // fetch_all_chats
  async fetch_chats(userId: Types.ObjectId) {
    const chat = await Chat.find({ participants: userId })
                            .sort({ updatedAt: -1 })          // most recentely active chats
                            .select("chatType createdAt createdBy admins participants updatedAt _id lastMessage")
                            .populate("lastMessage")
                            .populate("participants","name avatarUrl")
                            .lean();

    return chat;
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

  // fetchOlderMessage -> by chatId and cursor
  async fetchOlderMessages(chatId: string, before: string) {
    const messages = await Message.find({
      chat: chatId,
      createdAt: {
        $lt: new Date(before)
      }
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("sender", "name avatarUrl")
                      
    messages.reverse();
    return messages;
  }

  // fetch initialMessages -> by chatId
  async fetchInitialMessages(chatId: string) {
    const messages = await Message.find({chat:chatId})
              .select("type _id createdAt text chatId sender messageType chatType receiver updatedAt")
              .sort({createdAt: -1})
              .limit(20);

    messages.reverse();
    return messages;
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
  async saveMsgInDb(chatId: string, sender: string, message: string, id: Types.ObjectId, createdAt: Date, updatedAt: Date) {
    const data = await Message.create({
      _id: id,
      chat: chatId,
      sender,
      text: message,
      createdAt,
      updatedAt
    });
    await Chat.findByIdAndUpdate(chatId, {
      $push: {
        messages: data._id
      }
    }, { returnDocument: "after" });
  }
}
