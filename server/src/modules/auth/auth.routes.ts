import { Router } from "express";
import { loginRateLimiter, otpRateLimiter, registerRateLimiter } from "../../middlewares/rateLimiter.middleware";
import { validateRequest } from "../../middlewares/validate.request.middleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.validation";
import * as authController from "./auth.controller";

const router = Router();

router.post("/send_otp", otpRateLimiter, validateRequest(verifyEmailSchema), authController.sendOtp);

router.post("/register", registerRateLimiter, validateRequest(registerSchema), authController.register);

router.post("/login", loginRateLimiter, validateRequest(loginSchema), authController.login);

export default router;
