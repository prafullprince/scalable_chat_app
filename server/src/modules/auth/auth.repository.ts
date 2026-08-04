import mongoose from "mongoose";
import { OTP, User } from "../../models";
import jwt from "jsonwebtoken";

export class AuthRepository {
    // --------User--------
    async findByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }

    async createUser(name: string, email: string, password: string) {
        await User.create({ name, email, passwordHash: password})
    }

    // ------OTP------
    async findOtp(email: string) {
        const result = await OTP.findOne({ email }).sort({ createdAt: -1 });
        return result;
    }

    async saveOtp(email: string , otp: string) {
        const result = await OTP.create({ email, otp });
        return result;
    }

    // -----Token------
    async createAccessToken(id: mongoose.Types.ObjectId, name: string, email: string): Promise<string> {
        const payload = { id, name, email };
        const access_token = jwt.sign(payload, process.env.secret!, { expiresIn: "2h" });
        return access_token;
    }

    async createRefreshToken(id: mongoose.Types.ObjectId, name: string, email: string): Promise<string> {
        const payload = { id, name, email };
        const refresh_token = jwt.sign(payload, process.env.secret!, { expiresIn: "2h" });
        return refresh_token;
    }
}
