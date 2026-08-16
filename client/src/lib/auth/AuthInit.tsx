"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AuthService } from "@/services/auth.service";
import { clearAuth, setAccessToken, setUser } from "@/slice/auth.slice";
import Spinner from "@/loading/Spinner";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await AuthService.refresh();
        dispatch(setAccessToken(data.access_token));
        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(clearAuth()); // if user loggedout stays logged out
        console.log("Not authenticated", error);
      }
    };

    initAuth();
  }, [dispatch]);

  if (status === "checking") {
    return <Spinner className="w-6 h-6" />;
  }

  return <>{children}</>;
}
