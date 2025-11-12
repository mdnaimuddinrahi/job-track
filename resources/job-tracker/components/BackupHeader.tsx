import { Search, Globe, Sun, Grid, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-4 p-3 m-3 rounded-xl shadow-sm">
      {/* Left Section - Logo */}
     
      {/* Center Section - Search Bar */}
      <div className="flex">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search ⌘K"
            className="w-full pl-10 pr-4 py-2 text-sm border border-white rounded-lg  focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-5">
        <Globe className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" />
        <Sun className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" />
        <Grid className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" />
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" />

        {/* Profile Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-200"
          />
          <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </header>
  );
}
