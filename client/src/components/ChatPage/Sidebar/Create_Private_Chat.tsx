"use client"
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
  // hook
  const router = useRouter();
  const dispatch = useAppDispatch();

  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // create_chat_api_call
  async function submitHandler() {
    setLoading(true);
    try {
        const res: ICreatePrivateChatRes = await ChatService.create_private_chat({ toUserEmail: email, chatType: "private" });
        if(!res) {
            return;
        }
        toast.success(res.message);
        dispatch(setRefreshChat(true));
        dispatch(setSelectedChat(null));

        // push to that chat page
        router.push(`/chat/${res.chatId}/user/${res.otherUserId}`);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) {
            toast.error(error.message);
        }
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="">
      <div className="mb-5">
        <label className="block text-[#e0e0e8] text-sm mb-2 font-medium">
          Email
        </label>
        <div className="flex items-center gap-3 bg-[#18181b] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#6366f1] transition-colors">
          <Mail size={18} className="text-[#71717a] shrink-0" />
          <input
            type="text"
            placeholder="you@example.com"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-[#52525b] text-sm"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-neutral-200 transition hover:bg-neutral-800 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={submitHandler}
          disabled={loading}
          className="rounded-lg bg-blue-600 cursor-pointer px-4 py-2 text-white transition hover:bg-blue-700 flex justify-center items-center"
        >
          {loading ? <Spinner className="w-6 h-6" /> : <p>Confirm</p>}
        </button>
      </div>
    </div>
  );
};

export default Create_Private_Chat;
