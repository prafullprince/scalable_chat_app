import { RedisManager } from "../managers/redis.manager";
import { ChatMessage } from "./types";

export async function addToQueue(data: ChatMessage) {
    await RedisManager.getInstance().getQueueClient().rPush("chat_queue", JSON.stringify(data));
}
