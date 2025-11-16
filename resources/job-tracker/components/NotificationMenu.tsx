"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "You have a new message from Sarah.",
      time: "2m ago",
      unread: true,
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      id: 2,
      title: "Payment successful",
      description: "Your invoice #245 has been paid.",
      time: "10m ago",
      unread: false,
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 3,
      title: "New comment",
      description: "John commented on your post.",
      time: "1h ago",
      unread: true,
      avatar: "https://i.pravatar.cc/40?img=13",
    },
    {
      id: 4,
      title: "Server maintenance",
      description: "Scheduled maintenance at 2 AM.",
      time: "5h ago",
      unread: false,
      avatar: "https://i.pravatar.cc/40?img=14",
    },
    {
      id: 5,
      title: "New follower",
      description: "Emma started following you.",
      time: "1d ago",
      unread: false,
      avatar: "https://i.pravatar.cc/40?img=15",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close on outside click
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
      {/* Bell icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 focus:outline-none rounded-full hover:bg-gray-200"
      >
        <Bell className="w-5 h-5 text-gray-600 " />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Tooltip menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-xl shadow-lg z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-gray-800">
              Notifications
            </h3>
            <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition ${
                  n.unread ? "bg-gray-50" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={n.avatar}
                    alt={n.title}
                    className="w-10 h-10 rounded-full"
                  />
                  {n.unread && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {n.description}
                  </p>
                  <span className="text-[11px] text-gray-400">{n.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 text-center border-t">
            <button className="text-xs text-blue-600 font-medium hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
