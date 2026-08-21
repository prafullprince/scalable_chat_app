"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import Spinner from "@/loading/Spinner";
import { ChatService } from "@/services/chat.service";
import { setRefreshChat, setSelectedChat } from "@/slice/chat.slice";
import { ICreatePrivateChatRes } from "@/types/chat/chat.types";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Create_Private_Chat = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler() {
    setLoading(true);
    try {
      const res: ICreatePrivateChatRes = await ChatService.create_private_chat({
        toUserEmail: email,
        chatType: "private",
      });
      if (!res) {
        return;
      }
      toast.success(res.message);
      dispatch(setRefreshChat(true));
      dispatch(setSelectedChat(null));
      router.push(`/chat/${res.chatId}/user/${res.otherUserId}`);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 transition focus-within:border-indigo-400/70 focus-within:ring-2 focus-within:ring-indigo-500/15">
          <Mail size={18} className="shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="you@example.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">Start a private conversation with someone by email.</p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={submitHandler}
          disabled={loading || !email.trim()}
          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? <Spinner className="h-6 w-6" /> : "Create chat"}
        </button>
      </div>
    </div>
  );
};

export default Create_Private_Chat;
