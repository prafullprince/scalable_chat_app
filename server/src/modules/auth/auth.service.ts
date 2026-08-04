// Business Logic
import { OTP } from "../../models";
import { ApiError } from "../../utils/apiError.utils";
import { sendEmail } from "../../utils/email.utils";
import { AuthRepository } from "./auth.repository";
import { LoginDto, RegisterDto, VerifyEmailDto } from "./auth.validation";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";

export class AuthService {
    private repo = new AuthRepository();

    // SendOtp Business Logic
    async send_otp(input: VerifyEmailDto): Promise<{ message: string }> {
        // isUser already Exist
        const isUser = await this.repo.findByEmail(input.email);
        if(isUser) {
            throw new ApiError(409, "User is already register with us, Please login to continue");
        }

        // create otp
        const otp = otpGenerator.generate(6, {
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            digits: true
        });

        // save in db
        const otpDoc = await this.repo.saveOtp(input.email, otp);
        if(!otpDoc) {
            throw new ApiError(400, "Saving otp in db is failed");
        }

        try {
            // send mail
            await sendEmail(input.email, "Otp verification for Email", otpDoc.otp);
        } catch (error) {
            console.log(error);
            throw new ApiError(400, "Sending otp on mail is failed");
        }

        return {
            message: "Otp sent successfully"
        }
    }

    // Signup Business Logic
    async register(input: RegisterDto): Promise<{ message: string }> {
        // isUser exists
        const existingUser = await this.repo.findByEmail(input.email);
        if(existingUser) {
            throw new ApiError(409, "User already exists, Try to signin with different email");
        }

        // verify otp
        const otpDoc = await this.repo.findOtp(input.email);
        if(!otpDoc) {
            throw new ApiError(404, "Otp not found");
        }

        // isOtp valid
        if(otpDoc.otp !== input.otp) {
            throw new ApiError(400, "Invalid Otp");
        }

        // hash passwod
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // save in db
        await this.repo.createUser(input.name, input.email, hashedPassword);

        // return
        return {
            message: "User is Registered successffully",
        }
    }

    // Login Business Logic
    async login(input: LoginDto): Promise< { access_token: string, refresh_token: string }> {
        // isUser register
        const isUser = await this.repo.findByEmail(input.email);
        console.log(isUser);
        if(!isUser) {
            throw new ApiError(404, "You are not registered, first register");
        }

        // isPassword correct
        const isPassword = await bcrypt.compare(input.password, isUser.passwordHash);
        if(!isPassword) {
            throw new ApiError(400, "Incorrect Password");
        }

        // make default DP
        const profile_pic = fetch(`https://api.dicebear.com/9.x/initials/svg?seed=${isUser.name}`);

        // generate tokens
        const access_token = await this.repo.createAccessToken(isUser._id, isUser.name, isUser.name);
        const refresh_token = await this.repo.createRefreshToken(isUser._id, isUser.name, isUser.email);

        const tokens = { access_token: access_token, refresh_token: refresh_token };

        return tokens;
    }
}
