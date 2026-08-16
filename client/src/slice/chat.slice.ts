import { IModal } from "@/types/chat_sidebar/chat.client.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
    loading: boolean;
    refresh_chat: boolean;
    selected_chat: IModal | null
}

const initialState: IinitialState = {
    loading: false,
    refresh_chat: false,
    selected_chat: null
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setRefreshChat(state, action: PayloadAction<boolean>) {
            state.refresh_chat = action.payload;
        },
        setSelectedChat(state, action: PayloadAction<IModal | null>) {
            state.selected_chat = action.payload;
        }
    }
});
export const { setLoading, setRefreshChat, setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
