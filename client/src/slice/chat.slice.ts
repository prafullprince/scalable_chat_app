import { IModal } from "@/types/chat_sidebar/chat.client.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatStatus = "online" | "offline" | "typing";

interface IinitialState {
  loading: boolean;
  refresh_chat: boolean;
  selected_chat: IModal | null;
  chatUserStatus: Record<string, ChatStatus>;
}

const initialState: IinitialState = {
  loading: false,
  refresh_chat: false,
  selected_chat: null,
  chatUserStatus: {},
};

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
    },
    setChatUserStatus(
      state,
      action: PayloadAction<{ userId: string; status: ChatStatus }>,
    ) {
      const { userId, status } = action.payload;
      state.chatUserStatus[userId] = status;
    },
  },
});
export const { setLoading, setRefreshChat, setSelectedChat, setChatUserStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
