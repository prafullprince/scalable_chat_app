import { RedisManager } from "../../managers/redis.manager";

export const publishtyping = async (chatId: string, message: any) => {
    RedisManager.getInstance()
        .getPublisher()
        .publish(`typing:${chatId}`, JSON.stringify(message));
}
