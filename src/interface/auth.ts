export interface ReqLogin {
    email: string;
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
    phoneNumber: string;
}

export interface ResSendOtp {
    email?: string;
    otp?: string;
    message?: string;
}

export interface ResRegister {
    email: string;
    fullName: string;
    phoneNumber: string;
    otp: string;
}
