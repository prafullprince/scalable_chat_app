import { BsThreeDotsVertical } from "react-icons/bs";
import SearchBar from "../Sidebar/SearchBar";
import Buttons from "../Sidebar/Buttons";
import Chats from "../Sidebar/Chats";
import CreateChat from "../Sidebar/CreateChat";

const ChatSidebar = () => {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden bg-slate-950/80 px-3 pb-4 pt-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]">
      <div className="mb-1 flex shrink-0 items-center justify-between px-1">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300/80">Messages</p>
          <h1 className="text-2xl font-black tracking-tight text-white">Connect</h1>
        </div>

        <div className="flex items-center gap-2">
          <CreateChat />
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10">
            <BsThreeDotsVertical className="text-lg" />
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <SearchBar />
      </div>
      <div className="shrink-0">
        <Buttons />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Chats />
      </div>
    </div>
  );
};

export default ChatSidebar;
