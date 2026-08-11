"use client";

import { AuthService } from "@/services/auth.service";
import {
  clearAuth,
  setAccessToken,
  setLoading,
  setUser,
} from "@/slice/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Spinner from "@/loading/Spinner";
import { useAppSelector } from "../redux/hooks";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const data = await AuthService.refresh();
        dispatch(setAccessToken(data.access_token));
        dispatch(setUser(data.user));
      } catch(err) {
        dispatch(clearAuth()); // no valid refreshToken cookie -> stays logged out
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    init();
  }, [dispatch]);

  if (loading) return <Spinner className="w-6 h-6" />

  return <>{children}</>;
}
