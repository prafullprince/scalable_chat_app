import { IChat } from "@/types/chat_sidebar/chat.types";
import Image from "next/image";
import Link from "next/link";

const chats: IChat[] = [
  {
    chatId: "1",
    chatName: "Joe",
    lastMessage: {
      message: "Hey Joe",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Joe",
  },
  {
    chatId: "2",
    chatName: "Virat",
    lastMessage: {
      message: "Hey Virat",
      date: "1-3-3",
      isSeen: true,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Virat",
  },
  {
    chatId: "3",
    chatName: "Tony",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Tony",
  },
  {
    chatId: "4",
    chatName: "Messi",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Messi",
  },
  {
    chatId: "5",
    chatName: "Nord",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Nord",
  },
  {
    chatId: "6",
    chatName: "Knight",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Knight",
  },
  {
    chatId: "7",
    chatName: "Kick",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Kick",
  },
  {
    chatId: "8",
    chatName: "Doom",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Doom",
  },
  {
    chatId: "9",
    chatName: "Thor",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Thor",
  },
  {
    chatId: "10",
    chatName: "Joe",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Stark",
  },
  {
    chatId: "11",
    chatName: "Joe",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Hello",
  },
  {
    chatId: "12",
    chatName: "Joe",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Rohit",
  },
  {
    chatId: "13",
    chatName: "Joe",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Rex",
  },
  {
    chatId: "14",
    chatName: "Joe",
    lastMessage: {
      message: "Hey",
      date: "1-2-3",
      isSeen: false,
    },
    chat_dp: "https://api.dicebear.com/9.x/initials/svg?seed=Ned",
  },
];

const Chats = () => {
  return (
    <div className="mt-4 overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-1">
        {chats.map((chat: IChat) => (
          <Link href={""} key={chat.chatId}>
            <div className="w-full flex items-center gap-3 hover:bg-[#84838345] px-3 py-3 rounded-lg">
              {/* dp */}
              <Image
                src={chat.chat_dp}
                alt="user_dp"
                priority
                unoptimized
                width={50}
                height={40}
                className="border rounded-full min-w-10 min-h-10 ring ring-white/20"
              />

              {/* info */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-white/90">{chat.chatName}</p>
                  <p className="text-white/50 font-medium text-sm">{chat.lastMessage.date}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {chat.lastMessage.isSeen}
                    <p className="text-white/50 text-xs font-medium">{chat.lastMessage.message}</p>
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
