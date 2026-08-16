import { Router } from "express";
import { auth } from "../../middlewares/authentication.middleware";
import * as userController from "../user/user.controller"
import { errorHandler } from "../../middlewares/error.handler.middleware";

// router
const router = Router();

// routes
router.get("/details/:userId", auth, userController.getUserDetailsById, errorHandler);


// export
export default router;
