import { RedisManager } from "../managers/redis.manager";
import { ChatMessage } from "./types";

export const publishMessage = async (
  channel: string,
  message: ChatMessage
) => {
  await RedisManager.getInstance()
    .getPublisher()
    .publish(channel, JSON.stringify(message));
};
