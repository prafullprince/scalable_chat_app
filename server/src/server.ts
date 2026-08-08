import express, { Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { connectDB } from "./config/mongoDB";
dotenv.config();
import jwt from "jsonwebtoken";
import authRoutes from "./routes/index";
import { RedisManager } from "./managers/redis.manager";
import { SocketManager } from "./managers/socket.manager";
import { IUserPayload } from "./types/http";
import { RoomManager } from "./managers/room.manager";
import { addToQueue } from "./redis/add_to_queue";
import { publishMessage } from "./redis/publisher/chat.publisher";

// initialize an express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// create a http server instance
const server = http.createServer(app);

// create a websocket server instance
const wss = new WebSocketServer({ noServer: true });

// upgrade socket
server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const token = url.searchParams.get("token");

  // token_validation
  if (!token) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  // verify_token
  try {
    const decoded = jwt.verify(token, process.env.secret!);
    if (typeof decoded === "string" || !("id" in decoded)) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    request.user = decoded as IUserPayload;

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } catch {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
});

// websocket connection
wss.on("connection", (socket, request) => {
  console.log("LoggedIn User: ", request.user);
  if (!request.user) {
    // handle_unauthenticated_case
    return socket.send("Please Authenticate First");
  }
  console.log("Client Connected");

  // add_sockets
  SocketManager.getInstance().addSocket(request.user?.id, socket);

  // message_from_client
  socket.on("message", async (msg) => {
    // incoming_message
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch (err) {
      console.error("Invalid JSON received:", msg.toString());
      socket.send(
        JSON.stringify({ type: "error", message: "Invalid JSON format" }),
      );
      return;
    }

    // join_chat
    if (data.type === "join_chat") {
      RoomManager.getInstance().join_chat(data.chatId, socket);
    }

    // leave_chat
    if (data.type === "leave_chat") {
    }

    // chat
    if(data.type === "chat") {
        await publishMessage(data.chatId, data);
        await addToQueue(data);
    }
  });

  // handle_disconnect
  socket.on("close", () => {
    // cleanup memory
    // clean socket in socket_manager
    SocketManager.getInstance().cleanSocket(socket);

    // clean socket in chatRooms
    RoomManager.getInstance().cleanRoom(socket);
  });
});

// default routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from express server");
});

// routes
app.use("/api/v1", authRoutes);

// bootstrap: connect to DB + Redis, then start listening
async function bootstrap() {
  await connectDB();
  await RedisManager.getInstance().connect();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
