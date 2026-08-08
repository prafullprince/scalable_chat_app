"use client";

import Image from "next/image";
import { Video, Phone, Search, MoreVertical } from "lucide-react";

export default function ChatTopBar({
  name,
  avatarUrl,
  status,
}: {
  name: string;
  avatarUrl?: string;
  status?: string; // "online", "typing...", "last seen today at ..."
}) {
  return (
    <header className="flex items-center justify-between h-17.5 px-4 bg-[#161717] border-b border-white/5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={40}
              height={40}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-wa-accent flex items-center justify-center text-white text-sm font-medium">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-wa-border font-medium text-base truncate">
            {name}
          </h2>
          {status && (
            <p className="text-wa-text-muted text-xs truncate">{status}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 text-wa-text-muted-dark shrink-0">
        <button
          aria-label="Video call"
          className="hover:text-white transition-colors"
        >
          <Video size={22} />
        </button>
        <button
          aria-label="Voice call"
          className="hover:text-white transition-colors"
        >
          <Phone size={20} />
        </button>
        <button
          aria-label="Search in chat"
          className="hover:text-white transition-colors"
        >
          <Search size={20} />
        </button>
        <button
          aria-label="More options"
          className="hover:text-white transition-colors"
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );
}
