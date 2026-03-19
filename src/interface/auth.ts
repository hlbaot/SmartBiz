export interface ReqLogin {
    username: string;
    password: string;
}

export interface ResLogin {
    token: string;
    role: string;
    email: string;
    fullName: string;
}

export interface ReqRegister {
    email: string;
    password: string;
    fullName: string;
    phone: string;
}

export interface ResSendOtp {
    email?: string;
    otp?: string;
    message?: string;
}

export interface ReqVerifyOtp {
    email: string;
    otpCode: string;
}
