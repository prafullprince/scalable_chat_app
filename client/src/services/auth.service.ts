import api from "@/services/axios";
import { LoginReq, RegisterReq, sendOtpReq } from "./types";
import axios from "axios";

// AuthService
export const AuthService = {
  sendotp: async (data: sendOtpReq) => {
    try {
      const result = await api.post("/auth/send_otp", data);
      if (!result) {
        return;
      }
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // ApiError JSON: { success, message, errors }
        throw new Error(error.response.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  signup: async (data: RegisterReq) => {
    try {
      const result = await api.post("/auth/register", data);
      if (!result) {
        return;
      }
      return result.data;
    } catch (error) {
      if(axios.isAxiosError(error) && error.response) {
        // API_ERROR -> { success:, message, errors }
        throw new Error(error.response.data.message);
      }
      return;
    }
  },
  login: async (data: LoginReq) => {
    try {
      const result = await api.post("/auth/login", data);
      if (!result) {
        return;
      }
      
      return result;
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      return;
    }
  },
  refresh: async () => {
    try {
      const result = await api.post("/auth/refresh");
      if(!result) {
        return;
      }

      return result.data;
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      return;
    }
  }
};
