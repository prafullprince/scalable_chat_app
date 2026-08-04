export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SendOtpInput {
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
