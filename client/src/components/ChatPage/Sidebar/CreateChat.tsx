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
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state) => state.chat.selected_chat);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectChat = (chat: IModal) => {
    dispatch(setSelectedChat(chat));
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Create chat"
      >
        <MdOutlineCreateNewFolder className="cursor-pointer text-xl" />
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-12 z-20 w-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-[0_25px_60px_rgba(15,23,42,0.6)] backdrop-blur-xl">
          <div className="mb-2 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Start chat
          </div>
          {modals.map((chat) => (
            <button
              type="button"
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-200 transition hover:bg-indigo-500/10 hover:text-white"
            >
              <span>{chat.name.replace("_", " ")}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-300">
                {chat.id === 1 ? "1:1" : "Group"}
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedChat && (
        <ChatModal chat={selectedChat} onClose={() => dispatch(setSelectedChat(null))} />
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.75)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-300/80">Create</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{chat.name.replace("_", " ")}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div>{chat.name === "Private_Chat" && <Create_Private_Chat onClose={onClose} />}</div>
      </div>
    </div>
  );
}
