import { NextFunction, Request, Response } from "express";
import { ChatService } from "./chat.service";
import { ApiError } from "../../utils/apiError.utils";

const chatService = new ChatService();

// ----------Create_Private_Chat_Request-----------
export async function create_private_chat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const fromUserEmail = req.user?.email;
    if(!fromUserEmail) {
      throw new ApiError(401, "Unauthenticated")
    }
    // create chat in db and return chatId
    const { chatId, otherUserId } = await chatService.create_private_chat(
      req.body, fromUserEmail
    );

    return res.status(200).json({
        success: true,
        message: "Private Chat Created",
        chatId,
        otherUserId
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// ---------Fetch_All_Chats------------
export async function fetch_all_chats(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if(!userId) {
      throw new ApiError(403, "User not found");
    }

    // fetch_chats
    const allChats = await chatService.fetch_all_chats(userId);

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      allChats
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

// _________Fetch_Messages__________
export async function fetchMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await chatService.fetchMessages(req.body);
    if(!data) {
      throw new ApiError(404, "Chat not found");
    }

    return res.status(200).json({
      success: true,
      message: "Got your chat",
      data: {
        messages: data.messages,
        hasmore: data.hasmore,
        nextCursor: data.nextCursor
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
