import type { SignupForm } from "@/types/auth/auth.page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

interface IUser {
  name: string;
  email: string;
  about: string;
  profile_pic: string;
  user_id: string;
}

interface AuthState {
  signupData: SignupForm | null;
  loading: boolean;
  access_token: string | null;
  user: IUser | null;
  status: AuthStatus;
}

// initial_state
const initialState: AuthState = {
  signupData: null,
  loading: false,
  access_token: null,
  user: null,
  status: "checking",
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
      state.status = "authenticated";
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.access_token = null;
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

// export
export const { setSignupData, setLoading, setAccessToken, setUser, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
