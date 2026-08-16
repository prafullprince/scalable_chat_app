"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { access_token, status } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chat");
    }
  }, [status, router]);

  if (status === "checking") {
    return null;
  }

  if (access_token) {
    return null;
  }

  return <>{children}</>;
}
