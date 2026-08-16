import axios from "axios";
import api from "./axios";
import { CreatePrivateChatReq, fetchChatDetailsReq } from "./types";

export const ChatService = {
    getAllChat: async () => {
        try {
            const result = await api.get("/chat/chats");
            if(!result) {
                return;
            }

            return result.data;
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            }
        }
    },
    create_private_chat: async (data: CreatePrivateChatReq) => {
        try {
            const result = await api.post("/chat/private_chat", data);
            if(!result) {
                return;
            }

            return result.data;
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            }
        }
    },
    getChatMessages: async (data: fetchChatDetailsReq) => {
        try {
            const result = await api.post("/chat/messages", data);
            if(!result) {
                return;
            }

            return result.data;
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            }
        }
    },
    delete: async () => {
        
    }
}
