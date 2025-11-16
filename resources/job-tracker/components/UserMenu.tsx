"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, DollarSign, HelpCircle, LogOut } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative focus:outline-none"
      >
        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-gray-200"
        />
        <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Tooltip Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">John Doe</p>
              <p className="text-xs text-gray-500">admin@sneat.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 text-sm text-gray-700">
            <MenuItem icon={<User className="w-4 h-4" />} label="My Profile" />
            <MenuItem icon={<Settings className="w-4 h-4" />} label="Settings" />
            <MenuItem icon={<DollarSign className="w-4 h-4" />} label="Pricing" />
            <MenuItem icon={<HelpCircle className="w-4 h-4" />} label="FAQ" />
            <div className="border-t my-1"></div>
            <MenuItem icon={<LogOut className="w-4 h-4" />} label="Logout" danger />
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Menu Item
function MenuItem({
  icon,
  label,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 transition ${
        danger ? "text-red-600 hover:bg-red-50" : "text-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
