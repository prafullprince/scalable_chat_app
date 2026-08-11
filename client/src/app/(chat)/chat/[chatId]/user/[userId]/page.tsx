"use client";

import ChatTopBar from "@/components/ChatPage/Chat/ChatTopbar";
import MessageBubble from "@/components/ChatPage/Chat/MessageBubble";
import MessageInput from "@/components/ChatPage/Chat/MessageInput";
import ProtectedLayout from "@/lib/auth/ProtectedRoute";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen flex-1 bg-wa-bg-dark relative">
      <ProtectedLayout>
        <ChatTopBar name="Contact Name" status="online" />

        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-20 py-4 relative">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
              backgroundSize: "30px 30px",
            }}
          />
          <MessageBubble
            text="Sample incoming message"
            time="18:53"
            isOutgoing={false}
          />
          <MessageBubble
            text="Sample outgoing message"
            time="18:54"
            isOutgoing
            status="read"
          />
        </div>

        <MessageInput onSend={(text) => console.log("send:", text)} />
      </ProtectedLayout>
    </div>
  );
}
