import { WebSocket } from "ws";
import { ChatMessage } from "../redis/types";
import { SubscriptionManager } from "./subscription.manager";

export class RoomManager {
  // chat -> socket1,socket2,socket3
  private chatRooms = new Map<string, Set<WebSocket>>();
  // socket -> chat
  private socketRoom = new Map<WebSocket, string>();
  private static instance: RoomManager;

  // constructor
  private constructor() {}

  // getInstance
  static getInstance() {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }

  // join_chat
  async join_chat(chatId: string, socket: WebSocket) {
    // check isRoom Exists
    const clients = this.chatRooms.get(chatId);

    // no one is connected in this room // create room
    if (!clients) {
      this.chatRooms.set(chatId, new Set());

      // now subscribe to this chatRoom only first local user only
      await SubscriptionManager.getInstance().subscribeChatRoom(chatId);
    }

    // add socket in chatRoom
    this.chatRooms.get(chatId)?.add(socket);

    // chatId in socketRoom
    this.socketRoom.set(socket, chatId);

    // return
    socket.send(
      JSON.stringify({
        type: "join_chat",
        message: "Client added in chat",
      }),
    );
  }

  // leave_room
  // leaveChat(socket: WebSocket) {
  //   // is this socket is in any room
  //   const chatId = this.socketRoom.get(socket);
  //   if(!chatId) {
  //       return;
  //   }

  //   // fetch sockets of this room
  //   const clients = this.chatRooms.get(chatId)
  //   if(clients) {
  //       clients.delete(socket);

  //       // clean up empty rooms if their are no active client
  //       if(clients.size === 0) {
  //           this.chatRooms.delete(chatId);
  //       }
  //   }

  //   // delete userInRoom also
  //   this.socketRoom.delete(socket)
  // }

  cleanRoom(socket: WebSocket) {
    const chatId = this.socketRoom.get(socket);
    if(!chatId) {
      return;
    }

    // delete sockets from chatRooms
    const connectedClients = this.chatRooms.get(chatId);
    if(!connectedClients) {
      return;
    }
    connectedClients.delete(socket);

    // if no clients remain then delete chatRoom
    if(connectedClients.size === 0) {
      this.chatRooms.delete(chatId);
    }

    this.socketRoom.delete(socket);
  }

  // broadcast
  broadcast(channel: string, data: ChatMessage) {
    const chatId = channel.split(":")[1];

    // getRoom
    const clients = this.chatRooms.get(chatId);
    if (!clients) return;

    // send message to all
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "message",
            message: data.message,
            chatId: data.chatId,
          }),
        );
      }
    });
  }
}
