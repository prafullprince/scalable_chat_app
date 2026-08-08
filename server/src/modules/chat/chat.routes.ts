import { validateRequest } from "../../middlewares/validate.request.middleware";
import { create_private_chat_schema } from "./chat.validation";
import * as chatController from "./chat.controller";
import { Router } from "express";

const router = Router();

router.post("/private_chat", validateRequest(create_private_chat_schema), chatController.create_private_chat);

export default router;
