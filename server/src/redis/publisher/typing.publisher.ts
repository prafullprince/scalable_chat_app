import { RedisManager } from "../../managers/redis.manager";

export const publishtyping = async (roomId: string, message: any) => {
    RedisManager.getInstance()
        .getPublisher()
        .publish(`typing:${roomId}`, JSON.stringify(message));
}
