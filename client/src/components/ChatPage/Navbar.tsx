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
    <nav className="flex flex-col items-center justify-between w-16 min-h-screen bg-[#1d1f1f] py-4">
      {/* Top nav icons */}
      <div className="flex flex-col items-center gap-2">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-label={label}
              className={`
                flex items-center justify-center
                w-11 h-11 rounded-full
                transition-colors
                hover:cursor-pointer
                ${
                  isActive
                    ? "bg-[#fafafa] text-[#1d1f1f]"
                    : "text-wa-text-muted hover:bg-white/5"
                }
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-8 h-px bg-white/10 my-2" />

        {/* Meta AI */}
        <button
          aria-label="Meta AI"
          className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5 transition-colors"
        >
          <Sparkles size={22} className="text-[#a17fff]" />
        </button>
      </div>

      {/* Bottom: media/gallery + profile avatar */}
      <div className="flex flex-col items-center gap-4">
        <button
          aria-label="Media gallery"
          className="flex items-center justify-center w-11 h-11 rounded-full text-wa-text-muted-dark hover:bg-white/5 transition-colors"
        >
          <Images size={22} />
        </button>

        <button
          aria-label="Profile"
          className="w-9 h-9 rounded-full overflow-hidden border border-white/10"
        >
          {userAvatarUrl ? (
            <Image
              src={userAvatarUrl}
              alt="Your profile"
              width={36}
              height={36}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-wa-accent flex items-center justify-center text-white text-xs font-medium">
              U
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}
