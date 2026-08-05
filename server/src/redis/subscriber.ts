import { RedisManager } from "../managers/redis.manager";
import { RoomManager } from "../managers/room.manager";
import { ChatMessage } from "./types";

export const startSubscriber = async (channel: string) => {
  await RedisManager.getInstance()
    .getSubscriber()
    .subscribe(channel, (messsage) => {
        const data: ChatMessage = JSON.parse(messsage);

        // broadcast message
        RoomManager.getInstance().broadcast(channel, data);
    });
};
