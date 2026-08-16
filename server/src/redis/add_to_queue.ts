import { RedisManager } from "../managers/redis.manager";
import { ModifiedChatMessage } from "./types";

export async function addToQueue(data: ModifiedChatMessage) {
    await RedisManager.getInstance().getQueueClient().rPush("chat_queue", JSON.stringify(data));
}
