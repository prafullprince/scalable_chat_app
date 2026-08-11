import ChatSidebar from "@/components/ChatPage/Chat/ChatSidebar";
import Navbar from "@/components/ChatPage/Navbar";
import ProtectedLayout from "@/lib/auth/ProtectedRoute";
import React from "react";

const chatLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div className="flex max-h-screen overflow-y-hidden">
        <ProtectedLayout>
          {/* Navbar */}
          <Navbar />

          {/* Chat_Sidebar */}
          <ChatSidebar />

          {/* /chat page */}
          {children}
        </ProtectedLayout>
    </div>
  )
}

export default chatLayout
