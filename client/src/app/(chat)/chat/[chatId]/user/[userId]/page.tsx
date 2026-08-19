"use client";

import ChatTopBar from "@/components/ChatPage/Chat/ChatTopbar";
import MessageBubble from "@/components/ChatPage/Chat/MessageBubble";
import MessageInput from "@/components/ChatPage/Chat/MessageInput";
import { useWebSocket } from "@/hooks/useWebSocket";
import ProtectedLayout from "@/lib/auth/ProtectedRoute";
import { useAppSelector } from "@/lib/redux/hooks";
import Spinner from "@/loading/Spinner";
import { ChatService } from "@/services/chat.service";
import { UserService } from "@/services/user.service";
import { IMessage } from "@/types/chat_sidebar/chat.types";
import { IUserResponse } from "@/types/user/user.type.res";
import { formatMessageDate } from "@/utills/format.date";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ChatPage() {
  // hooks
  const { chatId, userId } = useParams<{ chatId: string; userId: string }>();
  const senderId = useAppSelector((state) => state.auth.user?.user_id);
  const { socketRef, isConnected } = useWebSocket();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);
  const chatUserStatus = useAppSelector((state) => state.chat.chatUserStatus);

  // state
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [messsages, setMessages] = useState<IMessage[]>([]);
  console.log(messsages);
  const [text, setText] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<IUserResponse | null>(null);
  const [chatStatus, setChatStatus] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // fetch_older_messages
  async function fetchOlderMessages() {
    setLoading(true);
    try {
      const res = await ChatService.getChatMessages({
        chatId,
        before: nextCursor,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // api_call -> fetch messages of current chat
  useEffect(() => {
    async function fetchInitialMessages() {
      setLoading(true);
      try {
        const res = await ChatService.getChatMessages({
          chatId,
          before: null,
        });
        setMessages(res?.data?.messages);
        setHasMore(res?.data?.hasmore);
        setNextCursor(res?.data?.nextCursor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // fetchOtherUserDetails
    async function fetchOtherUser() {
      setUserLoading(true);
      try {
        const res = await UserService.getById(userId);
        setUserDetails(res.data);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setUserLoading(false);
      }
    }

    fetchInitialMessages();
    fetchOtherUser();
  }, [chatId, userId]);

  // Websocket
  useEffect(() => {
    if (!isConnected) {
      return;
    }
    const socket = socketRef.current;
    if (!socket) {
      toast.error("Websocket is not open yet");
      return;
    }

    // join_chat
    socket.send(
      JSON.stringify({
        type: "join_chat",
        chatId,
      }),
    );

    // mark as online
    socket.send(
      JSON.stringify({
        type: "online",
        receiverId: userId,
      }),
    );

    function handleMessage(e: MessageEvent) {
      const data = JSON.parse(e.data);

      if (data.type === "new_message") {
        const message = {
          createdAt: data.createdAt,
          sender: data.sender,
          text: data.text,
          type: data.messageType,
          updatedAt: data.updatedAt,
          _id: data._id,
        };
        console.log("data incoming: ", data);
        setMessages((prev) => [...prev, message]);
      }

      if (data.type === "online_receiver") {
        console.log("online receiver: ", data);
        setChatStatus("online");
      }

      if(data.type === "typing") {
        if(data.status === "typing") {
          setIsTyping(true);
        } else {
          setIsTyping(false);
        }
      }
    }

    // register message callback
    socket.addEventListener("message", handleMessage);

    // cleanup
    return () => {
      socket.removeEventListener("message", handleMessage);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "leave_chat",
            chatId,
          }),
        );
      }
    };
  }, [isConnected, chatId, socketRef, userId]);

  // typing_status
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !isConnected) {
      return;
    }

    // first key_stroke
    if (!isTypingRef.current) {
      isTypingRef.current = true;

      // send typing_status
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "typing_status",
            status: "typing",
            chatId: chatId,
          }),
        );
      }
    }

    // Reset previous timer
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    // Start 5 second timer
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;

      socket.send(
        JSON.stringify({
          type: "typing_status",
          status: "online",
          chatId: chatId,
        }),
      );
    }, 2000);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      isTypingRef.current = false;
    };
  }, [socketRef, isConnected, text, chatId]);

  // lastMessage_in_view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messsages]);

  return (
    <div className="flex flex-col min-h-screen flex-1 bg-wa-bg-dark relative">
      <ProtectedLayout>
        {!userLoading ? (
          <ChatTopBar
            name={userDetails?.name}
            chatUserStatus={chatUserStatus}
            userId={userId}
            isTyping={isTyping}
          />
        ) : (
          <div className="w-full h-17.5 flex justify-center items-center px-4 bg-[#161717] border-b border-white/5">
            <Spinner className="w-6 h-6 text-yellow-600" />
          </div>
        )}

        <div className="flex-1 relative overflow-hidden">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative h-full overflow-y-auto scrollbar-hide px-4 sm:px-20 pt-4 pb-22">
            {messsages.map((msg) => (
              <div key={msg?._id}>
                {msg.sender === senderId ? (
                  <MessageBubble
                    text={msg.text}
                    time={formatMessageDate(msg.createdAt)}
                    isOutgoing
                    status="read"
                  />
                ) : (
                  <MessageBubble
                    text={msg.text}
                    time={formatMessageDate(msg.createdAt)}
                    isOutgoing={false}
                    status="read"
                  />
                )}

                {/* Always stay at the bottom */}
                <div ref={bottomRef} className="" />
              </div>
            ))}
          </div>
        </div>

        <MessageInput
          text={text}
          setText={setText}
          onSend={(text) => {
            // send message
            const socket = socketRef.current;
            if (!socket) {
              toast.error("Socket Connection failed. Refresh page");
              return;
            }

            if (socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  type: "chat",
                  text: text,
                  chatId: chatId,
                  sender: senderId,
                  receiver: userId,
                  messageType: "text",
                  chatType: "private",
                }),
              );
            } else {
              toast.error("Client is closed");
            }
          }}
        />
      </ProtectedLayout>
    </div>
  );
}
