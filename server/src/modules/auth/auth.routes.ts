import { Router } from "express";
import { loginRateLimiter, otpRateLimiter, registerRateLimiter } from "../../middlewares/rateLimiter.middleware";
import { validateRequest } from "../../middlewares/validate.request.middleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.validation";
import * as authController from "./auth.controller";
import { errorHandler } from "../../middlewares/error.handler.middleware";
import { auth } from "../../middlewares/authentication.middleware";

const router = Router();

router.post("/send_otp", otpRateLimiter, validateRequest(verifyEmailSchema), authController.sendOtp, errorHandler);
router.post("/register", registerRateLimiter, validateRequest(registerSchema), authController.register, errorHandler);
router.post("/login", loginRateLimiter, validateRequest(loginSchema), authController.login, errorHandler);
router.post("/refresh", authController.refresh, errorHandler);

export default router;
