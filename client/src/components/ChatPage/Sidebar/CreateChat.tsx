"use client";

import { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Create_Private_Chat from "./Create_Private_Chat";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { IModal } from "@/types/chat_sidebar/chat.client.types";
import { setSelectedChat } from "@/slice/chat.slice";

const modals: IModal[] = [
  { id: 1, name: "Private_Chat" },
  { id: 2, name: "Group_Chat" },
];

const CreateChat = () => {
  // hook
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state)=>state.chat.selected_chat);

  // state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handleSelectChat
  const handleSelectChat = (chat: IModal) => {
    dispatch(setSelectedChat(chat));
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Create chat button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <MdOutlineCreateNewFolder className="text-wa-bg text-3xl cursor-pointer" />
      </button>

      {/* Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-8 z-10 rounded-lg bg-wa-green-500 p-2 text-xs font-medium text-wa-panel">
          {modals.map((chat) => (
            <button
              type="button"
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className="block rounded-lg px-3 py-1.5 transition-all duration-300 hover:bg-white/80 hover:text-black cursor-pointer"
            >
              {chat.name}
            </button>
          ))}
        </div>
      )}

      {/* Actual modal */}
      {selectedChat && (
        <ChatModal
          chat={selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default CreateChat;

interface ChatModalProps {
  chat: IModal;
  onClose: () => void;
}

function ChatModal({ chat, onClose }: ChatModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#131313b8] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-wa-bg">
            {chat.name}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 font-semibold text-wa-bg cursor-pointer transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="">
          {
            chat.name === "Private_Chat" && <Create_Private_Chat onClose={onClose} />
          }
        </div>
      </div>
    </div>
  );
}
