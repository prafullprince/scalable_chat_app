import axios from "axios";
import api from "./axios";

export const UserService = {
    getById: async (userId: string) => {
        try {
            const result = await api.get(`/user/details/${userId}`);

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
    }
}
