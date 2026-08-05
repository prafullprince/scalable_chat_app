import { WebSocket } from "ws";
import { ChatService } from "../modules/chat/chat.service";
import { startSubscriber } from "../redis/subscriber";
import { ChatMessage } from "../redis/types";

const chatService = new ChatService();

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

  // join_room
  async joinChat(fromUserId: string, toUserId:string, chatType:string, socket: WebSocket, groupName?: string, groupDescription?: string) {
    // create chat in db and return chatId
    const chatId = await chatService.join_chat(fromUserId, toUserId, chatType, socket, groupName, groupDescription);
    if(!chatId) {
      return socket.send("Join chat has no chatid")
    }

    // check is this user exists in chatRoom
    if(!this.chatRooms.has(chatId.toString())) {
      // add chat
      this.chatRooms.set(chatId.toString(), new Set());
      // subscribe to room of first local socket
      await startSubscriber(`chat:${chatId}`);
    }

    // add socket in that chat
    this.chatRooms.get(chatId.toString())?.add(socket);

    // add chatId in socketRoom
    this.socketRoom.set(socket, chatId.toString());

    // send success
    socket.send("Chat added in room");
    console.log("chatRooms: ", this.chatRooms);
    console.log("socketRooms: ", this.socketRoom);
  }

  // leave_room
  leaveChat(socket: WebSocket) {
    // is this socket is in any room
    const chatId = this.socketRoom.get(socket);
    if(!chatId) {
        return;
    }

    // fetch sockets of this room
    const clients = this.chatRooms.get(chatId)
    if(clients) {
        clients.delete(socket);

        // clean up empty rooms if their are no active client
        if(clients.size === 0) {
            this.chatRooms.delete(chatId);
        }
    }
    
    // delete userInRoom also
    this.socketRoom.delete(socket)
  }

  // broadcast
  broadcast(channel: string, data: ChatMessage) {
    const chatId = channel.split(":")[1];

    // getRoom
    const clients = this.chatRooms.get(chatId);
    if(!clients) return;

    // send message to all
    clients.forEach((client)=>{
      if(client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "message",
          message: data.message,
          chatId: data.chatId
        }));
      }
    })
    console.log("chat data: ", data);
  }
}
