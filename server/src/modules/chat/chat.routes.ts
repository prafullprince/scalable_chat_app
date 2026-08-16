import { validateRequest } from "../../middlewares/validate.request.middleware";
import { create_private_chat_schema, fetch_chat_details_schema } from "./chat.validation";
import * as chatController from "./chat.controller";
import { Router } from "express";
import { errorHandler } from "../../middlewares/error.handler.middleware";
import { auth } from "../../middlewares/authentication.middleware";

const router = Router();

router.post("/private_chat", auth, validateRequest(create_private_chat_schema), chatController.create_private_chat, errorHandler);
router.get("/chats", auth, chatController.fetch_all_chats, errorHandler);
router.post("/messages", auth, validateRequest(fetch_chat_details_schema), chatController.fetchMessages, errorHandler);

export default router;
