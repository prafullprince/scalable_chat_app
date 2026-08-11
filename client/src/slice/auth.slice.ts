import { SignupForm } from "@/app/(auth)/signup/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  email: string;
  about: string;
  profile_pic: string;
}

interface IinitialState {
  signupData: SignupForm | null;
  loading: boolean;
  access_token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

// initial_state
const initialState: IinitialState = {
  signupData: null,
  loading: false,
  access_token: null,
  user: null,
  isAuthenticated: false
};

// auth_slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignupForm>) {
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.access_token = null;
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

// export
export const { setSignupData, setLoading, setAccessToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
