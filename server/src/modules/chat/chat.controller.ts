import { Request, Response } from "express";
import { ChatService } from "./chat.service";

const chatService = new ChatService();

// ----------Create_Private_Chat_Request-----------
export async function create_private_chat(
  req: Request,
  res: Response,
) {
  try {
    // create chat in db and return chatId
    const chatId = await chatService.create_private_chat(
      req.body
    );

    return res.status(200).json({
        success: true,
        message: "Private Chat Created",
        chatId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
