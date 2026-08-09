import { RedisManager } from "../../managers/redis.manager";

export const publishPresence = async (userId: string, data: string) => {
    RedisManager.getInstance()
            .getPublisher()
            .publish(`presence:${userId}`, data);
}
