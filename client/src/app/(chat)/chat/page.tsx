import Buttons from "@/components/ChatPage/Sidebar/Buttons";
import Chats from "@/components/ChatPage/Sidebar/Chats";
import SearchBar from "@/components/ChatPage/Sidebar/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 bg-wa-sidebar px-3 pt-4 min-w-sm">
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
  )
}

export default ChatPage
