'use client';

import React from 'react';
import { Plus, Smile, Mic, Send } from 'lucide-react';

export default function MessageInput({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSend: (text: string) => void;
}) {
  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="rounded-[22px] border border-white/10 bg-slate-900/75 p-2 shadow-[0_20px_40px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button aria-label="Attach" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white">
          <Plus size={20} />
        </button>

        <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2.5">
          <button aria-label="Emoji" className="shrink-0 text-slate-300 transition hover:text-white">
            <Smile size={18} />
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </div>

        <button
          aria-label={text.trim() ? 'Send' : 'Voice message'}
          onClick={text.trim() ? handleSend : undefined}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
            text.trim()
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
          }`}
        >
          {text.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  );
}
