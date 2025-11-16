// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
"use client";
import { Search, Globe, Sun, Grid, Bell, Calendar, FileText, Users, Shield, LayoutDashboard, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SearchModal from "./SearchModal";
import UserMenu from "./UserMenu";
import NotificationMenu from "./NotificationMenu";
import LanguageMenu from "./LanguageMenu";
import { useTheme } from 'next-themes'

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // <-- 🚀 Prevent hydration mismatch

  return (
    <header className="flex items-center justify-between bg-white px-4 p-3 m-3 rounded-xl shadow-sm">
      {/* Left Section - Logo */}
      The current theme is: {theme}

      {/* Center Section - Search Bar */}
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>

      <div className="flex">
        <div className="relative">
          <Search
            className="absolute left-3 top-2.5 text-gray-400 w-4 h-4"
            onClick={() => setOpenSearch(true)}
          />
          <input
            type="text"
            placeholder="Search ⌘K"
            className="w-full pl-10 pr-4 py-2 text-sm border border-white rounded-lg focus:outline-none"
          />
        </div>
      </div>

       <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-5">
        <LanguageMenu />

        <div className="relative">
          <Grid
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
              <div className="px-4 py-3 border-b">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Shortcuts</span>
                  <Settings className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4">
                {[
                  { icon: Calendar, title: "Calendar", desc: "Appointments" },
                  { icon: FileText, title: "Invoice App", desc: "Manage Accounts" },
                  { icon: Users, title: "Users", desc: "Manage Users" },
                  { icon: Shield, title: "Role Management", desc: "Permissions" },
                  { icon: LayoutDashboard, title: "Dashboard", desc: "User Dashboard" },
                  { icon: Settings, title: "Settings", desc: "Account Settings" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                  >
                    <item.icon className="w-6 h-6 text-indigo-500 mb-1" />
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <NotificationMenu />
        <UserMenu />

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



// "use client";
// import { Search, Globe, Sun, Grid, Bell, Calendar, FileText, Users, Shield, LayoutDashboard, Settings } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import SearchModal from "./SearchModal";
// import UserMenu from "./UserMenu";
// import NotificationMenu from "./NotificationMenu";
// import LanguageMenu from "./LanguageMenu";
// import { useTheme } from 'next-themes'


// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const [openSearch, setOpenSearch] = useState(false);

//   // const ThemeChanger = () => {
//   const { theme, setTheme } = useTheme()

//   // return (
//   //   <div>
//   //     The current theme is: {theme}
//   //     <button onClick={() => setTheme('light')}>Light Mode</button>
//   //     <button onClick={() => setTheme('dark')}>Dark Mode</button>
//   //   </div>
//   // )
// // }

//   useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//           setOpen(false);
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//   return (
//     <header className="flex items-center justify-between bg-white px-4 p-3 m-3 rounded-xl shadow-sm">
//       {/* Left Section - Logo */}
//      The current theme is: {theme}
//       {/* Center Section - Search Bar */}
//       <select value={theme} onChange={e => setTheme(e.target.value)}>
//         <option value="system">System</option>
//         <option value="dark">Dark</option>
//         <option value="light">Light</option>
//       </select>
//       <div className="flex">
//         <div className="relative">
//           {/* <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" /> */}
//           <Search
//             className="absolute left-3 top-2.5 text-gray-400 w-4 h-4"
//             onClick={() => setOpenSearch(true)}
//           />
//           <input
//             type="text"
//             placeholder="Search ⌘K"
//             className="w-full pl-10 pr-4 py-2 text-sm border border-white rounded-lg  focus:outline-none"
//           />
//         </div>
//       </div>
//       <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
//       {/* Right Section - Icons */}
//       <div className="flex items-center space-x-5">
//         {/* <Globe className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" /> */}
//         <LanguageMenu />
//         {/* <Grid className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" /> */}
//         <div className="relative">
//           <Grid
//             className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600 "
//             onClick={() => setOpen(!open)}
//           />
//           {open && (
//             <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
//               <div className="px-4 py-3 border-b">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-gray-700">Shortcuts</span>
//                   <Settings className="w-4 h-4 text-gray-500" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 p-4">
//                 {[
//                   { icon: Calendar, title: "Calendar", desc: "Appointments" },
//                   { icon: FileText, title: "Invoice App", desc: "Manage Accounts" },
//                   { icon: Users, title: "Users", desc: "Manage Users" },
//                   { icon: Shield, title: "Role Management", desc: "Permissions" },
//                   { icon: LayoutDashboard, title: "Dashboard", desc: "User Dashboard" },
//                   { icon: Settings, title: "Settings", desc: "Account Settings" },
//                 ].map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
//                   >
//                     <item.icon className="w-6 h-6 text-indigo-500 mb-1" />
//                     <span className="text-sm font-medium text-gray-700">{item.title}</span>
//                     <span className="text-xs text-gray-500">{item.desc}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         {/* <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-indigo-600" /> */}
//         <NotificationMenu />
//         {/* Profile Avatar */}
//         <UserMenu />
//         <div className="relative">
//           <img
//             src="https://i.pravatar.cc/40?img=3"
//             alt="User Avatar"
//             className="w-8 h-8 rounded-full border border-gray-200"
//           />
//           <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
//         </div>
//       </div>
//     </header>
//   );
// }
