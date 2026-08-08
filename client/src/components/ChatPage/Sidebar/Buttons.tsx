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
    <div className="mt-1 px-2">
      <div className="flex items-center gap-2">
        {buttons.map((button: IButton) => (
          <button
            key={button.id}
            className={`border rounded-4xl px-3 py-1 hover:cursor-pointer text-sm font-medium ${selectedButton === button ? "text-white border-wa-green bg-wa-bubble-out-dark" : "text-white/50 border-wa-bubble-in-dark"}`}
            onClick={() => setSelectedButtons(button)}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
