// components/EmptyChatState.tsx
'use client';

import { FileText, UserPlus, Sparkles } from 'lucide-react';

export default function EmptyChatState() {
  return (
    <div className="hidden md:flex flex-1 min-h-screen max-h-screen flex-col items-center justify-center bg-[#1d1f1f] px-6">
      {/* Card */}
      <div className="flex flex-col items-center bg-[#161717] rounded-2xl px-12 py-10 max-w-md w-full">
        {/* Illustration */}
        <div className="relative mb-8">
          {/* Laptop base */}
          <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
            <path
              d="M20 90h100l8 10a4 4 0 0 1-4 6H16a4 4 0 0 1-4-6l8-10z"
              fill="#d9fdd3"
            />
            <rect x="30" y="10" width="80" height="80" rx="4" fill="#d9fdd3" />
          </svg>

          {/* Green phone card, offset behind */}
          <div className="absolute top-0 left-3 w-16 h-20 bg-[#25d366] rounded-md flex flex-col items-start p-2 gap-1.5 -rotate-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#161717] flex items-center justify-center">
              <span className="text-[6px] leading-none">×</span>
            </div>
            <div className="w-8 h-0.5 bg-[#161717]/70 rounded-full" />
            <div className="w-8 h-0.5 bg-[#161717]/70 rounded-full" />
            <div className="w-8 h-0.5 bg-[#161717]/70 rounded-full" />
          </div>

          {/* White phone card, front */}
          <div className="absolute top-0 left-14 w-16 h-20 bg-[#faf6f2] rounded-md flex items-center justify-center rotate-2 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25d366">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-white text-2xl font-normal mb-3 text-center">
          Download WhatsApp for Mac
        </h2>

        {/* Body text */}
        <p className="text-wa-text-muted-dark text-sm text-center mb-6 leading-relaxed">
          Make calls and get a faster experience when
          <br />
          you download the Mac app.
        </p>

        {/* CTA button */}
        <button
          className="
            bg-[#1a342a] text-wa-accent font-semibold text-sm
            px-6 py-2.5 rounded-full
            hover:bg-[#1e3d31] transition-colors
          "
        >
          Get from App Store
        </button>
      </div>

      {/* Bottom action row */}
      <div className="flex items-center gap-10 mt-10">
        <ActionButton icon={<FileText size={20} />} label="Send document" />
        <ActionButton icon={<UserPlus size={20} />} label="Add contact" />
        <ActionButton
          icon={<Sparkles size={20} className="text-[#a17fff]" />}
          label="Ask Meta AI"
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div
        className="
          w-14 h-14 rounded-full flex items-center justify-center
          bg-[#343636] text-white
          group-hover:bg-[#3f4141] transition-colors
        "
      >
        {icon}
      </div>
      <span className="text-white text-xs">{label}</span>
    </button>
  );
}
