export type RegisterReq = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    otp: string;
}

export type LoginReq = {
    email: string;
    password: string;
}

export type sendOtpReq = {
    email: string
}
