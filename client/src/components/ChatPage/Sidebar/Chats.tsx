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
  const user = useAppSelector((state) => state.auth.user);
  const chatUserStatus = useAppSelector((state) => state.chat.chatUserStatus);
  const refresh_chat = useAppSelector((state) => state.chat.refresh_chat);
  const { socketRef, isConnected } = useWebSocket();
  const dispatch = useAppDispatch();

  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (!isConnected || !socketRef?.current) return;

    const socket = socketRef.current;

    function handleMessage(e: MessageEvent) {
      const data = JSON.parse(e.data);

      if (data.type === "online_receiver") {
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
      <div className="mt-4 flex h-full w-full items-center justify-center">
        <Spinner className="h-10 w-10 text-indigo-400" />
      </div>
    );
  }

  if (!chats.length) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-4 text-center text-sm text-slate-400">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="mt-4 h-full overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-2 pb-2">
        {chats?.map((chat: IChat) => {
          const otherUser = chat?.participants?.find(
            (participant) => participant._id !== user?.user_id,
          );

          const status = otherUser?._id
            ? (chatUserStatus[otherUser._id] ?? "offline")
            : "offline";

          const isOnline = status === "online";
          const lastMessageText = chat?.lastMessage?.message ?? "No messages yet";

          return (
            <Link
              href={`/chat/${chat?._id}/user/${otherUser?._id}`}
              key={chat?._id}
              className="group"
            >
              <div className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-slate-900/40 px-3 py-3 transition hover:border-indigo-400/20 hover:bg-slate-800/80 hover:shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
                <div className="relative shrink-0">
                  <Image
                    src={otherUser?.avatarUrl || "/globe.svg"}
                    alt="user_dp"
                    priority
                    unoptimized
                    width={52}
                    height={52}
                    className="h-12 w-12 rounded-full border border-white/10 object-cover shadow-md"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {otherUser?.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {isOnline ? (
                        <HiOutlineStatusOnline className="text-xl text-emerald-400" />
                      ) : (
                        <HiOutlineStatusOffline className="text-lg text-slate-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-xs text-slate-400">
                      {isOnline ? <span className="mr-1 text-[11px] text-emerald-400">online</span> : ""}
                      {lastMessageText}
                    </p>
                    <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                      {chat?.lastMessage?.createdAt ? "Now" : "New"}
                    </span>
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
