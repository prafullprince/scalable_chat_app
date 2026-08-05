import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";
dotenv.config();

export class RedisManager {
  private static instance: RedisManager;
  private publisher: RedisClientType;
  private subscriber: RedisClientType;

  private constructor() {
    this.publisher = createClient({ url: process.env.REDIS_URL! });
    this.subscriber = this.publisher.duplicate();

    this.publisher.on("error", (err) => console.error("Redis Publisher Error", err));
    this.subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));
  }

  static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  async connect() {
    if (!this.publisher.isOpen) {
      await this.publisher.connect();
    }
    if (!this.subscriber.isOpen) {
      await this.subscriber.connect();
    }
  }

  getPublisher(): RedisClientType {
    return this.publisher;
  }

  getSubscriber(): RedisClientType {
    return this.subscriber;
  }
}
