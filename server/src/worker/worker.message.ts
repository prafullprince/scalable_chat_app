import { connectDB } from "../config/mongoDB";
import { RedisManager } from "../managers/redis.manager";
import { ChatService } from "../modules/chat/chat.service";


export async function startWorker() {
    await connectDB();
    await RedisManager.getInstance().connect();
    const redisQueueClient = RedisManager.getInstance().getQueueClient();
    const chatService = new ChatService();

    while(true) {
        const result = await redisQueueClient.blPop("chat_queue", 0);
        if(!result) continue;

        const message = JSON.parse(result.element);
        console.log("messages from queue: ", message);

        // store in mongodb
        try {
            // add msg in db
            await chatService.addMsgInDb(message);
        } catch (error) {
            console.log("Error during saving messages in db: ", error);
        }

    }
}
startWorker();
