"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Spinner from "@/loading/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "checking") {
    return <div className="flex justify-center items-center w-screen h-screen">
      <Spinner className="w-10 h-10 text-yellow-600" />;
    </div>
  }

  if (status === "unauthenticated") {
    return <div className="flex justify-center items-center w-screen h-screen">
      <Spinner className="w-10 h-10 text-yellow-600" />;
    </div>
  }

  return <>{children}</>;
}
