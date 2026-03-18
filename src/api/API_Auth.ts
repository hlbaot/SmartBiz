import axios from "axios";
import type { ReqLogin, ReqRegister, ResRegister, ResSendOtp } from "../interface/auth";
import { API } from "./base_api";

// đăng nhập
export const API_Login = async (loginData: ReqLogin) => {
    try {
        const response = await axios.post(`${API}/auth/login`, loginData);
        return response.data;
    }
    catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

//gửi otp
export const API_SendOTP = async (email: string) => {
    try {
        const response = await axios.post(`${API}/auth/send-otp`, { email });
        return response.data as ResSendOtp;
    }
    catch (error) {
        console.error("Send OTP failed:", error);
        throw error;
    }
}

// đăng ký
export const API_Register = async (registerData: ReqRegister) => {
    try {
        const response = await axios.post(`${API}/auth/register`, registerData);
        return response.data as ResRegister;
    }
    catch (error) {
        console.error("Register failed:", error);
        throw error;
    }
}
