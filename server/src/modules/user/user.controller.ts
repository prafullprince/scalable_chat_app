import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { ApiError } from "../../utils/apiError.utils";

const userService = new UserService();

// UserDetailsById
export async function getUserDetailsById(req: Request, res: Response, next: NextFunction) {
    try {
        const userIdParam = req.params.userId;
        const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;
        console.log(userId);
        if (!userId) {
            throw new ApiError(404, "UserId not found");
        }

        const data = await userService.fetchUserDetailsById(userId);
        return res.status(200).json({
            success: true,
            message: "User details fetched",
            data
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

