import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError.utils";
import { AuthService } from "./auth.service";

const authService = new AuthService();

// ----------Send_Otp Request-------------
export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authService.send_otp(req.body);
        return res.status(201).json({
            success: true,
            message: "Otp sent successfully"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// -----------Signup Request-------------
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.register(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered",
            result: result.message
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// ----------Login Request-------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await authService.login(req.body);
        if(!data.access_token || !data.refresh_token || !data.user_about || !data.user_dp || !data.user_email || !data.user_name || !data.user_id) {
            throw new ApiError(400, "Data not found");
        }

        // save refresh_token in cookies
        res.cookie("refresh_token", data.refresh_token ,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "LoggedIn Successfully",
            accessToken: data.access_token,
            user: {
                name: data.user_name,
                email: data.user_email,
                about: data.user_about,
                profile_pic: data.user_dp,
                user_id: data.user_id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// ----------Refresh Token-------------
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if(!refresh_token) {
            throw new ApiError(400, "Refresh token doesn't exist");
        }

        const data = await authService.refresh(refresh_token);
        if(!data.accessToken || !data.refreshToken || !data.user_about || !data.user_dp || !data.user_email || !data.user_name || !data.user_id) {
            throw new ApiError(400, "Token or User not found");
        }

        res.cookie("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            messasge: "Refresh token successfully",
            access_token: data.accessToken,
            user: {
                user_name: data.user_name,
                user_about: data.user_about,
                user_email: data.user_email,
                user_dp: data.user_dp,
                user_id: data.user_id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
