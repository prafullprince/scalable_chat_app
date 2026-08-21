"use client";

import { useState } from "react";

interface IButton {
  id: number;
  text: string;
}

const buttons: IButton[] = [
  { id: 1, text: "All" },
  { id: 2, text: "Unread" },
  { id: 3, text: "Favourites" },
  { id: 4, text: "Groups" },
];

const Buttons = () => {
  const [selectedButton, setSelectedButtons] = useState<IButton>(buttons[0]);

  return (
    <div className="px-1">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {buttons.map((button: IButton) => {
          const isSelected = selectedButton.id === button.id;

          return (
            <button
              key={button.id}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                isSelected
                  ? "border-indigo-400/40 bg-gradient-to-r from-indigo-500/20 to-violet-500/15 text-white shadow-[0_0_18px_rgba(99,102,241,0.18)]"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
              onClick={() => setSelectedButtons(button)}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Buttons;
