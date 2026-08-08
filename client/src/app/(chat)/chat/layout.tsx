import EmptyChatState from "@/components/ChatPage/Chat/DefaultChatScreen";
import React from "react";

const chatLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div className="flex max-h-screen overflow-y-hidden">
        {/* Navbar */}
    
        {/* /chat page */}
        {children}

        {/* chat */}
        <EmptyChatState />
    </div>
  )
}

export default chatLayout
