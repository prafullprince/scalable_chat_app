"use client";

import ChatTopBar from "@/components/ChatPage/Chat/ChatTopbar";
import MessageBubble from "@/components/ChatPage/Chat/MessageBubble";
import MessageInput from "@/components/ChatPage/Chat/MessageInput";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen flex-1 bg-wa-bg-dark relative">
      <ChatTopBar name="Contact Name" status="online" />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-20 py-4">
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
    </div>
  );
}
