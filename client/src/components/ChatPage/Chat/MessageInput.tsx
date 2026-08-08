'use client';

import { useState } from 'react';
import { Plus, Smile, Mic, Send } from 'lucide-react';

export default function MessageInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#161717] border-t border-white/5 absolute bottom-4 right-2 left-2 rounded-xl">
      <button aria-label="Attach" className="text-wa-text-muted-dark hover:text-white transition-colors shrink-0">
        <Plus size={24} />
      </button>

      <div className="flex-1 flex items-center gap-2 bg-[#242626] rounded-full px-4 py-2.5">
        <button aria-label="Emoji" className="text-wa-text-muted-dark hover:text-white transition-colors shrink-0">
          <Smile size={20} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-wa-border placeholder:text-wa-text-muted-dark text-sm"
        />
      </div>

      <button
        aria-label={text.trim() ? 'Send' : 'Voice message'}
        onClick={text.trim() ? handleSend : undefined}
        className="text-wa-text-muted-dark hover:text-white transition-colors shrink-0"
      >
        {text.trim() ? <Send size={22} /> : <Mic size={22} />}
      </button>
    </div>
  );
}
