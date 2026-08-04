import express, { Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { connectDB } from "./config/mongoDB";
dotenv.config();

import authRoutes from "./routes/index";

// initialize an express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// create a http server instance
const server = http.createServer(app);

// db connection
connectDB();

// create a websocket server instance
const wss = new WebSocketServer({ server });

// websocket connection
wss.on("connection", (socket)=>{
    console.log("Client Connected");
    socket.send("Hello from server");
});

// default routes
app.get("/",(req: Request, res: Response)=>{
    res.send("Hello from express server");
});

// routes
app.use("/api/v1", authRoutes);

// run server
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
