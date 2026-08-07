import { ChatMessage } from "../redis/types";
import { RedisManager } from "./redis.manager";
import { RoomManager } from "./room.manager";

export class SubscriptionManager {
  private static instance: SubscriptionManager;
  private subscriber = RedisManager.getInstance().getSubscriber();

  // Instance
  static getInstance() {
    if (!this.instance) {
      this.instance = new SubscriptionManager();
    }
    return this.instance;
  }

  // subscribe_presence
  async subscribePresence(userId: string) {
    await this.subscriber.subscribe(`presence:${userId}`, ()=>{});
  }

  // unsubscribe_presence
  async unsubscribePresence(userId: string) {
    await this.subscriber.unsubscribe(`presence:${userId}`);
  }

  // subscribe_chat_room
  async subscribeChatRoom(chatId: string) {
    await this.subscriber.subscribe(`chat:${chatId}`, (message: string) => {
      // when message came in this chat room
      const data: ChatMessage = JSON.parse(message);

      // broadcast message to chatRoom
      RoomManager.getInstance().broadcast(`chatId:${chatId}`, data);
    });
  }

  // subscribe_typing
  async subscribeTyping(chatId: string) {
    await this.subscriber.subscribe(`typing:${chatId}`, ()=>{});
  }

  // unsubscribe_chat_room
  async unsubscribeChatRoom(chatId: string) {
    await this.subscriber.unsubscribe(`chat:${chatId}`);
  }

  // unsubscribe_typing
  async unsubscribeTyping(chatId: string) {
    await this.subscriber.unsubscribe(`typing:${chatId}`);
  }

  // subscribe_notification
  async subscribeNotification(userId: string) {
    await this.subscriber.subscribe(
      `notification:${userId}`,
      ()=>{},
    );
  }

  // unsubscribe_notification
  async unsubscribeNotification(userId: string) {
    await this.subscriber.unsubscribe(`notification:${userId}`);
  }
}
