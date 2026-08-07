import { RedisManager } from "../../managers/redis.manager";

export const publishNotification = async (userId: string, message: any) => {
  RedisManager.getInstance()
    .getPublisher()
    .publish(`notification:${userId}`, JSON.stringify(message));
};
