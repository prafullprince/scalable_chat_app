// Handles request response
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError.utils";
import { ApiResponse } from "../../utils/apiResponse.utils";
import { AuthService } from "./auth.service";

const authService = new AuthService();

// -----------Signup Request-------------
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = authService.register(req.body);
        res.status(201).json(new ApiResponse(201, result));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Internal server error during register", error);
    }
}

// ----------Send_Otp Request-------------
export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.send_otp(req.body);
        res.status(201).json(new ApiResponse(201, result));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error", error);
    }
}

// ----------Login Request-------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await authService.login(req.body);
        console.log(tokens);
        if(!tokens.access_token || !tokens.refresh_token) {
            throw new ApiError(400, "Tokens not found");
        }

        // save refresh_token in cookies
        res.cookie("refresh_token", tokens.refresh_token ,{
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json(new ApiResponse(200, (await tokens).access_token));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error");
    }
}
