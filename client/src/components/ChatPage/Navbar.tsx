// components/NavRail.tsx
"use client";

import { useState } from "react";
import {
  MessageSquare,
  Phone,
  CircleDot,
  MessageCircle,
  Users,
  Sparkles,
  Images,
} from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "chats", icon: MessageSquare, label: "Chats" },
  { id: "calls", icon: Phone, label: "Calls" },
  { id: "status", icon: CircleDot, label: "Status" },
  { id: "communities-chat", icon: MessageCircle, label: "Updates" },
  { id: "communities", icon: Users, label: "Communities" },
];

export default function NavRail({ userAvatarUrl }: { userAvatarUrl?: string }) {
  const [active, setActive] = useState("chats");

  return (
    <nav className="flex w-20 min-h-screen flex-col items-center justify-between bg-slate-950/80 px-2 py-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]">
      <div className="flex flex-col items-center gap-2">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-label={label}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-200 ${
                isActive
                  ? "border-indigo-400/30 bg-gradient-to-br from-indigo-500/25 to-violet-500/10 text-white shadow-[0_0_18px_rgba(99,102,241,0.18)]"
                  : "border-transparent bg-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
            </button>
          );
        })}

        <div className="my-2 h-px w-8 bg-white/10" />

        <button
          aria-label="Meta AI"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300 transition hover:border-violet-400/40 hover:bg-violet-500/15"
        >
          <Sparkles size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          aria-label="Media gallery"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent text-slate-400 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
        >
          <Images size={20} />
        </button>

        <button
          aria-label="Profile"
          className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg"
        >
          {userAvatarUrl ? (
            <Image
              src={userAvatarUrl}
              alt="Your profile"
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white">
              U
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}
