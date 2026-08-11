"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { access_token } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (!access_token) {
      router.replace("/login");
    }
  }, [access_token, router]);

  return <>{children}</>;
}
