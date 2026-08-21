import ChatSidebar from "@/components/ChatPage/Chat/ChatSidebar";
import Navbar from "@/components/ChatPage/Navbar";
import ProtectedLayout from "@/lib/auth/ProtectedRoute";
import React from "react";

const chatLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen overflow-hidden bg-[#09090b] text-white">
      <ProtectedLayout>
        <div className="flex h-screen w-full overflow-hidden">
          <div className="h-screen border-r border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <Navbar />
          </div>

          <aside className="h-screen w-[360px] shrink-0 overflow-hidden border-r border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <ChatSidebar />
          </aside>

          <main className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_25%),linear-gradient(180deg,_#0f172a_0%,_#0b1220_100%)]">
            {children}
          </main>
        </div>
      </ProtectedLayout>
    </div>
  );
};

export default chatLayout;
