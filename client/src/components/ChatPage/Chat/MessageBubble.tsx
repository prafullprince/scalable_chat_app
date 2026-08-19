import { Check, CheckCheck } from "lucide-react";

type MessageStatus = "sent" | "delivered" | "read";

export default function MessageBubble({
  text,
  time,
  isOutgoing,
  status = "read",
}: {
  text: string;
  time: string;
  isOutgoing: boolean;
  status?: MessageStatus;
}) {
  return (
    <div
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`
          relative max-w-[65%] sm:max-w-[55%] px-3 py-2 rounded-lg
          ${
            isOutgoing
              ? "bg-wa-bubble-out-dark text-wa-border"
              : "bg-wa-bubble-in-dark text-wa-border"
          }
        `}
      >
        <p className="text-sm pr-14 whitespace-pre-wrap wrap-break-word">
          {text}
        </p>
        <span className="absolute bottom-1 right-2 flex items-center gap-1 text-[10px] text-wa-text-muted">
          <span className="text-mauve-400">{time}</span>
          {isOutgoing &&
            (status === "read" ? (
              <CheckCheck size={14} className="text-[#53bdeb]" />
            ) : status === "delivered" ? (
              <CheckCheck size={14} />
            ) : (
              <Check size={14} />
            ))}
        </span>
      </div>
    </div>
  );
}
