// components/EmptyChatState.tsx
'use client';

import { FileText, UserPlus, Sparkles } from 'lucide-react';

export default function EmptyChatState() {
  return (
    <div className="hidden flex-1 min-h-screen max-h-screen flex-col items-center justify-center bg-transparent px-6 md:flex">
      <div className="w-full max-w-xl rounded-[30px] border border-white/10 bg-slate-950/60 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="h-28 w-28 rounded-[28px] bg-gradient-to-br from-emerald-400/30 via-indigo-500/20 to-violet-500/20 ring-1 ring-white/10" />
            <div className="absolute inset-4 flex items-center justify-center rounded-[22px] bg-slate-900/90 shadow-inner shadow-emerald-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-xl text-slate-950">
                <Sparkles size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-indigo-300/80">Start a conversation</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Your chats are ready</h2>
          <p className="mt-3 text-base leading-7 text-slate-300">
            Choose a contact from the sidebar to continue a conversation or start a new one.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
            New message
          </button>
          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110">
            Start chat
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-8">
        <ActionButton icon={<FileText size={20} />} label="Send document" />
        <ActionButton icon={<UserPlus size={20} />} label="Add contact" />
        <ActionButton icon={<Sparkles size={20} className="text-violet-300" />} label="Ask Meta AI" />
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="group flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 group-hover:text-white">
        {icon}
      </div>
      <span className="text-xs text-slate-300">{label}</span>
    </button>
  );
}
