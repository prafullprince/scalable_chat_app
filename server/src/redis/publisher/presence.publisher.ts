import { RedisManager } from "../../managers/redis.manager";

export const publishPresence = async (userId: string, message: any) => {
    RedisManager.getInstance()
            .getPublisher()
            .publish(`presence:${userId}`, JSON.stringify(message));
}
