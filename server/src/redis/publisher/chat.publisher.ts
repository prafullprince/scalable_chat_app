import { RedisManager } from "../../managers/redis.manager";
import { ChatMessage } from "../types";

export const publishMessage = async (
  chatId: string,
  message: ChatMessage
) => {
  await RedisManager.getInstance()
    .getPublisher()
    .publish(`chat:${chatId}`, JSON.stringify(message));
};
