"use client";

import { useAppSelector } from "@/lib/redux/hooks";

export function useAuthGuard() {
  const access_token = useAppSelector((state)=>state.auth.access_token);
  return { access_token };
}
