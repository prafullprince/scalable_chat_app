import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import SearchBar from "../Sidebar/SearchBar";
import Buttons from "../Sidebar/Buttons";
import Chats from "../Sidebar/Chats";

const ChatSidebar = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 bg-wa-sidebar px-3 pt-4 min-w-sm border-l border-r border-white/10">
      {/* topbar */}
      <div className="flex items-center justify-between mb-2">
        {/* left */}
        <h1 className="text-wa-bg font-extrabold text-2xl">WhatsApp</h1>

        {/* right */}
        <div className="flex items-center gap-4">
          <MdOutlineCreateNewFolder className="text-wa-bg text-3xl" />
          <BsThreeDotsVertical className="text-wa-bg text-2xl font-semibold" />
        </div>
      </div>

      {/* search_bar */}
      <SearchBar />

      {/* buttons */}
      <Buttons />

      {/* chats */}
      <Chats />
    </div>
  );
};

export default ChatSidebar;
