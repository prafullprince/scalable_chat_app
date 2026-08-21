"use client";

import Image from "next/image";
import { Video, Phone, Search, MoreVertical } from "lucide-react";
import { ChatStatus } from "@/slice/chat.slice";

export default function ChatTopBar({
  name,
  avatarUrl,
  chatUserStatus,
  userId,
  isTyping,
}: {
  name: string | undefined;
  avatarUrl?: string;
  chatUserStatus: Record<string, ChatStatus>;
  userId: string;
  isTyping: boolean;
}) {
  const status = userId ? (chatUserStatus[userId] ?? "offline") : "offline";

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/70 px-5 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-slate-800 shadow-lg">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name ? name : "Name"}
              width={44}
              height={44}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-white">{name}</h2>
          <p className="truncate text-xs text-slate-400">
            {status === "online" && !isTyping && (
              <span className="text-emerald-400">online</span>
            )}
            {status === "online" && isTyping && (
              <span className="text-amber-300">typing...</span>
            )}
            {status !== "online" && <span>offline</span>}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-slate-300">
        {[
          { aria: "Video call", icon: Video },
          { aria: "Voice call", icon: Phone },
          { aria: "Search in chat", icon: Search },
          { aria: "More options", icon: MoreVertical },
        ].map(({ aria, icon: Icon }) => (
          <button
            key={aria}
            aria-label={aria}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </header>
  );
}
