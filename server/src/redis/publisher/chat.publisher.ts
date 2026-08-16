import { RedisManager } from "../../managers/redis.manager";
import { ModifiedChatMessage } from "../types";

export const publishMessage = async (
  chatId: string,
  message: ModifiedChatMessage
) => {
  await RedisManager.getInstance()
    .getPublisher()
    .publish(`chat:${chatId}`, JSON.stringify(message));
};
