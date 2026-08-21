import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 shadow-inner shadow-slate-950/20 transition focus-within:border-indigo-400/60 focus-within:ring-2 focus-within:ring-indigo-500/15">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar
