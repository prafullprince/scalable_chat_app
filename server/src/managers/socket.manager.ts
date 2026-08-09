import { WebSocket } from "ws";
import { publishPresence } from "../redis/publisher/presence.publisher";
import { SubscriptionManager } from "./subscription.manager";

export class SocketManager {
  // user -> socket
  private sockets = new Map<string, Set<WebSocket>>();
  // socket -> user
  private userSocket = new Map<WebSocket, string>();
  private static instance: SocketManager;

  private constructor() {}

  static getInstance() {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  addSocket(userId: string, socket: WebSocket) {
    // if user has no socket
    if (!this.sockets.has(userId)) {
      // create empty socket
      this.sockets.set(userId, new Set());
    }
    // add socket to that user
    this.sockets.get(userId)?.add(socket);
    this.userSocket.set(socket, userId);
  }

  getSockets(userId: string) {
    return this.sockets.get(userId) ?? new Set();
  }

  removeSocket(userId: string, socket: WebSocket) {
    // check is user sockets are there
    const userSockets = this.sockets.get(userId);
    if (!userSockets) {
      return;
    }

    // remove that socket from userSockets
    userSockets.delete(socket);

    // clean up the map entry entirely once the user has no open sockets
    if (userSockets.size === 0) {
      this.sockets.delete(userId);
    }
  }

  cleanSocket(socket: WebSocket) {
    // check is user sockets are there
    const userId = this.userSocket.get(socket);

    if (!userId) {
      return;
    }

    // remove that socket from Sockets
    const userSockets = this.sockets.get(userId);
    if(!userSockets) {
      return;
    }
    userSockets?.delete(socket);

    // clean up the map entry entirely once the user has no open sockets
    if (userSockets.size === 0) {
      this.sockets.delete(userId);
    }
    this.userSocket.delete(socket);

    // unsubscribe_presence
    SubscriptionManager.getInstance().unsubscribePresence(userId);
  }

  sendToAllDevice(userId: string, msg: unknown) {
    const userSockets = this.sockets.get(userId);
    if (!userSockets) return;

    const data = JSON.stringify(msg);

    // sendToAll
    userSockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });
  }
}
