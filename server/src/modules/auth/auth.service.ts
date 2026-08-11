// Business Logic
import { ApiError } from "../../utils/apiError.utils";
import { sendEmail } from "../../utils/email.utils";
import { AuthRepository } from "./auth.repository";
import { LoginDto, RegisterDto, VerifyEmailDto } from "./auth.validation";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

export class AuthService {
  private repo = new AuthRepository();

  // SendOtp Business Logic
  async send_otp(input: VerifyEmailDto): Promise<{ message: string }> {
    // isUser already Exist
    const isUser = await this.repo.findByEmail(input.email);
    if (isUser) {
      throw new ApiError(
        409,
        "User is already register with us, Please login to continue",
      );
    }

    // create otp
    const otp = otpGenerator.generate(6, {
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      digits: true,
    });

    // save in db
    const otpDoc = await this.repo.saveOtp(input.email, otp);
    if (!otpDoc) {
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
      message: "Otp sent successfully",
    };
  }

  // Signup Business Logic
  async register(input: RegisterDto): Promise<{ message: string }> {
    // isUser exists
    const existingUser = await this.repo.findByEmail(input.email);
    if (existingUser) {
      throw new ApiError(409, "User already exists, Login to continue");
    }

    // verify otp
    const otpDoc = await this.repo.findOtp(input.email);
    if (!otpDoc) {
      throw new ApiError(404, "Otp not found");
    }

    // isOtp valid
    if (otpDoc.otp !== input.otp) {
      throw new ApiError(400, "Invalid Otp");
    }

    // hash passwod
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // create_profile_pic
    const profile_pic = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(input.name)}`;

    // save in db
    await this.repo.createUser(
      input.name,
      input.email,
      hashedPassword,
      profile_pic,
    );

    // return
    return {
      message: "User is Registered successffully",
    };
  }

  // Login Business Logic
  async login(
    input: LoginDto,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user_name: string;
    user_email: string;
    user_dp: any;
    user_about: string;
  }> {
    // isUser register
    const isUser = await this.repo.findByEmail(input.email);
    if (!isUser) {
      throw new ApiError(404, "You are not registered, Please signup");
    }

    // isPassword correct
    const isPassword = await bcrypt.compare(
      input.password,
      isUser.passwordHash,
    );
    if (!isPassword) {
      throw new ApiError(400, "Incorrect Password");
    }

    // generate tokens
    const access_token = await this.repo.createAccessToken(
      isUser._id,
      isUser.name,
      isUser.name,
    );
    const refresh_token = await this.repo.createRefreshToken(
      isUser._id,
      isUser.name,
      isUser.email,
    );

    // hash refresh_token
    const hashedRefreshToken = this.repo.hashToken(refresh_token);

    // save refresh_token in db
    await this.repo.saveSessionInDB(
      isUser?._id,
      hashedRefreshToken,
      isUser.name,
      isUser.email,
    );

    // return data
    const data = {
      access_token: access_token,
      refresh_token: refresh_token,
      user_name: isUser.name,
      user_email: isUser.email,
      user_dp: isUser.avatarUrl,
      user_about: isUser.about,
    };

    return data;
  }

  // Refresh Business Logic
  async refresh(refresh_token: string) {
    // verify refresh_token
    const decode = jwt.verify(refresh_token, process.env.refresh_secret!);
    if (!decode) {
      throw new ApiError(400, "Invalid refresh_token");
    }

    // hash the refresh_token
    const hashRefreshToken = this.repo.hashToken(refresh_token);

    // check isSession exist
    const session = await this.repo.findSessionFromDb(hashRefreshToken);
    if (!session) {
      throw new ApiError(400, "Session expired");
    }

    // find_user
    const isUser = await this.repo.findByEmail(session.email);
    if (!isUser) {
      throw new ApiError(404, "User not found");
    }

    // delete old session
    await this.repo.deleteSessionFromDb(hashRefreshToken);

    // generate new access_token
    const new_access_token = await this.repo.createAccessToken(
      session.userId,
      session.name,
      session.email,
    );

    // generate new refresh_token
    const new_refresh_token = await this.repo.createRefreshToken(
      session.userId,
      session.name,
      session.email,
    );

    // hash new Refresh_Token
    const hashedNewRefreshToken = this.repo.hashToken(new_refresh_token);

    // create new session
    await this.repo.saveSessionInDB(
      session.userId,
      hashedNewRefreshToken,
      session.name,
      session.email,
    );

    // return tokens
    const data = {
      accessToken: new_access_token,
      refreshToken: new_refresh_token,
      user_name: isUser?.name,
      user_email: isUser?.email,
      user_dp: isUser?.avatarUrl,
      user_about: isUser?.about,
    };
    return data;
  }
}
