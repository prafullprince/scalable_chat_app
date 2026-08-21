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
    <div className={`mb-2 flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[72%] rounded-2xl px-3.5 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.15)] sm:max-w-[60%] ${
          isOutgoing
            ? "rounded-br-md bg-gradient-to-br from-emerald-500/80 to-emerald-600/80 text-slate-950"
            : "rounded-bl-md border border-white/10 bg-slate-900/90 text-slate-50"
        }`}
      >
        <p className="whitespace-pre-wrap break-words pr-14 text-sm leading-6">
          {text}
        </p>
        <span className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[10px] opacity-90">
          <span className={isOutgoing ? "text-slate-900/80" : "text-slate-300"}>{time}</span>
          {isOutgoing &&
            (status === "read" ? (
              <CheckCheck size={12} className="text-sky-700" />
            ) : status === "delivered" ? (
              <CheckCheck size={12} />
            ) : (
              <Check size={12} />
            ))}
        </span>
      </div>
    </div>
  );
}
