"use client";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Spinner from "@/loading/Spinner";
import { ChatService } from "@/services/chat.service";
import { setChatUserStatus } from "@/slice/chat.slice";
import { IChat } from "@/types/chat_sidebar/chat.types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
import { toast } from "sonner";

const Chats = () => {
  // hook
  const user = useAppSelector((state) => state.auth.user);
  const chatUserStatus = useAppSelector((state) => state.chat.chatUserStatus);
  console.log("chatUserSttaus: ", chatUserStatus);
  const refresh_chat = useAppSelector((state) => state.chat.refresh_chat);
  // console.log(user)
  const { socketRef, isConnected } = useWebSocket();
  const dispatch = useAppDispatch();

  // state
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  // console.log("chats: ", chats);

  // chat_api_call
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const res = await ChatService.getAllChat();
        setChats(res.allChats);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [refresh_chat]);

  // Effect 1 — listen for status changes
  useEffect(() => {
    if (!isConnected || !socketRef?.current) return;

    const socket = socketRef.current;

    function handleMessage(e: MessageEvent) {
      const data = JSON.parse(e.data);

      if (data.type === "online_receiver") {
        console.log("online_receiver: ", data);
        dispatch(
          setChatUserStatus({
            userId: data.userId,
            status: data.status,
          }),
        );
      }
    }

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [isConnected, socketRef, dispatch]);

  // Effect 2 — ask about each chat user's status -> online event
  useEffect(() => {
    if (!chats.length || !isConnected || !socketRef?.current) {
      return;
    }

    const socket = socketRef.current;

    chats.forEach((chat: IChat) => {
      const otherUserId = chat.participants.find(
        (usr) => usr._id !== user?.user_id,
      )?._id;

      if (!otherUserId) return;

      socket.send(
        JSON.stringify({
          type: "is_online",
          receiverId: otherUserId,
        }),
      );
    });
  }, [chats, isConnected, socketRef, user?.user_id]);

  if (loading) {
    return (
      <div className="mt-4 w-full h-full flex justify-center items-center">
        <Spinner className="w-10 h-10 text-yellow-600" />
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-1">
        {chats?.map((chat: IChat) => {
          const otherUser = chat?.participants?.find(
            (participant) => participant._id !== user?.user_id,
          );

          const status = otherUser?._id
            ? (chatUserStatus[otherUser?._id] ?? "offline")
            : "offline";

          return (
            <Link
              href={`/chat/${chat?._id}/user/${otherUser?._id}`}
              key={chat?._id}
            >
              <div className="w-full flex items-center gap-3 hover:bg-[#84838345] px-3 py-3 rounded-lg">
                {/* dp */}
                <Image
                  src={otherUser?.avatarUrl || "/globe.svg"}
                  alt="user_dp"
                  priority
                  unoptimized
                  width={50}
                  height={50}
                  className="border rounded-full min-w-10 min-h-10 ring ring-white/20"
                />

                {/* info */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">{otherUser?.name}</p>
                    <p className="text-white/50 font-medium text-sm">
                      {status === "online" && (
                        <HiOutlineStatusOnline className="text-green-400 text-2xl" />
                      )}
                      {status === "offline" && <HiOutlineStatusOffline className="text-lg" />}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {chat?.lastMessage?.isSeen}
                      <p className="text-white/50 text-xs font-medium">
                        {status === "online" ? <span className="text-sm text-green-400">online</span> : ""}
                        {chat?.lastMessage?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
