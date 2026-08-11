"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { access_token } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (access_token) {
      router.replace("/chat");
    }
  }, [access_token, router]);

  return <>{children}</>;
}
