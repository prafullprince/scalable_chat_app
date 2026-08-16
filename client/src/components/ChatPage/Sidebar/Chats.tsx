"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import Spinner from "@/loading/Spinner";
import { ChatService } from "@/services/chat.service";
import { IChat } from "@/types/chat_sidebar/chat.types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const Chats = () => {
  // hook
  const user = useAppSelector((state)=>state.auth.user);
  const refresh_chat = useAppSelector((state)=>state.chat.refresh_chat);
  // console.log(user)
  
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

  if (loading) {
    return <div className="mt-4 w-full h-full flex justify-center items-center">
      <Spinner className="w-10 h-10 text-yellow-600" />
    </div>;
  }

  return (
    <div className="mt-4 overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-1">
        {chats?.map((chat: IChat, index: number) => (
          <Link href={`/chat/${chat?._id}/user/${chat?.participants?.find((participant)=> participant._id !== user?.user_id)?._id}`} key={index}>
            <div className="w-full flex items-center gap-3 hover:bg-[#84838345] px-3 py-3 rounded-lg">
              {/* dp */}
              <Image
                src={chat?.participants?.find((participant)=> participant._id !== user?.user_id)?.avatarUrl || "/globe.svg"}
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
                  <p className="text-white/90">{chat?.participants?.find((participant)=> participant._id !== user?.user_id)?.name}</p>
                  <p className="text-white/50 font-medium text-sm">
                    {chat?.lastMessage?.date}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {chat?.lastMessage?.isSeen}
                    <p className="text-white/50 text-xs font-medium">
                      {chat?.lastMessage?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chats;
