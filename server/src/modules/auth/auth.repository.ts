import mongoose from "mongoose";
import { OTP, User } from "../../models";
import jwt from "jsonwebtoken";
import { Session } from "../../models/session.model";
import crypto from "crypto";
import { Types } from 'mongoose';

export class AuthRepository {
    // --------User--------
    async findByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }

    async createUser(name: string, email: string, password: string, profile_pic: any) {
        await User.create({ name, email, passwordHash: password, avatarUrl: profile_pic});
    }

    async saveSessionInDB(userId: Types.ObjectId, refreshTokenHash: string, name: string, email: string) {
        await Session.create({
            userId,
            tokenHash: refreshTokenHash,
            name,
            email,
            expireAt: new Date(
                Date.now() + 7*24*60*60*1000
            )
        });
    }

    async findSessionFromDb(hashedRefreshToken: string) {
        const session = await Session.findOne({ tokenHash: hashedRefreshToken });
        return session;
    }

    async deleteSessionFromDb(hashedRefreshToken: string) {
        await Session.deleteOne({ tokenHash: hashedRefreshToken });
    }

    // ------OTP------
    async findOtp(email: string) {
        const result = await OTP.findOne({ email }).sort({ createdAt: -1 });
        return result;
    }

    async saveOtp(email: string , otp: string) {
        const result = await OTP.findOneAndUpdate(
            {email},
            {email, otp, createdAt: new Date()}, // new value
            {upsert: true, returnDocument: "after", setDefaultsOnInsert: true} // create if not found, else update
        )
        return result;
    }

    // -----Token------
    async createAccessToken(id: mongoose.Types.ObjectId, name: string, email: string): Promise<string> {
        const payload = { id, name, email };
        const access_token = jwt.sign(payload, process.env.access_secret!, { expiresIn: "2h" });
        return access_token;
    }

    async createRefreshToken(id: mongoose.Types.ObjectId, name: string, email: string): Promise<string> {
        const payload = { id, name, email };
        const refresh_token = jwt.sign(payload, process.env.refresh_secret!, { expiresIn: "7d" });
        return refresh_token;
    }

    hashToken(token: string) {
        return crypto.createHash("sha256").update(token).digest("hex");
    }
}
