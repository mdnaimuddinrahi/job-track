"use client";

import {
  Inbox,
  Send,
  Star,
  Trash2,
  Edit3,
  AlertCircle,
  RefreshCcw,
  Settings,
  Mail,
} from "lucide-react";

export default function EmailPage() {
  const emails = [
    {
      id: 1,
      sender: "Dalila Ouldcott",
      subject: "Order Feedback",
      avatar: "https://i.pravatar.cc/50?img=32",
      label: "green",
      time: "09:56 AM",
    },
    {
      id: 2,
      sender: "Lockwood Kubicek",
      subject: "Finally Start Running",
      avatar: "https://i.pravatar.cc/50?img=14",
      label: "orange",
      time: "09:56 AM",
    },
    {
      id: 3,
      sender: "Milena Osgarby",
      subject: "Eco Food",
      avatar: "https://i.pravatar.cc/50?img=11",
      label: "green",
      time: "09:56 AM",
    },
    {
      id: 4,
      sender: "Pheobe Buffay",
      subject: "Personal Insurance",
      avatar: "https://i.pravatar.cc/50?img=5",
      label: "yellow",
      time: "09:56 AM",
    },
  ];

  return (
    <div className="w-full flex bg-gray-50 rounded-lg shadow-sm border p-4">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r px-4">
        <button className="w-full py-2 rounded-lg bg-indigo-500 text-white font-medium mt-2 hover:bg-indigo-600">
          Compose
        </button>

        <div className="mt-6 space-y-2">
          <SidebarItem label="Inbox" icon={<Inbox size={18} />} count={3} />
          <SidebarItem label="Sent" icon={<Send size={18} />} />
          <SidebarItem label="Draft" icon={<Edit3 size={18} />} count={4} />
          <SidebarItem label="Starred" icon={<Star size={18} />} />
          <SidebarItem label="Spam" icon={<AlertCircle size={18} />} count={2} />
          <SidebarItem label="Trash" icon={<Trash2 size={18} />} />
        </div>

        {/* LABELS */}
        <div className="mt-8 text-xs uppercase text-gray-500">Labels</div>
        <div className="mt-3 space-y-2">
          <LabelItem color="red" text="Private" />
          <LabelItem color="blue" text="Company" />
          <LabelItem color="yellow" text="Important" />
          <LabelItem color="green" text="Personal" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white p-3 rounded border shadow-sm">
          <input
            type="text"
            placeholder="Search mail"
            className="flex-1 px-3 py-2 border rounded focus:outline-none"
          />

          <button className="p-2 hover:bg-gray-100 rounded">
            <RefreshCcw size={18} />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded">
            <Settings size={18} />
          </button>
        </div>

        {/* EMAIL LIST */}
        <div className="mt-4 bg-white rounded border shadow-sm overflow-y-auto h-[70vh]">
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
          {emails.map((mail) => (
            <div
              key={mail.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <Star className="text-gray-300 hover:text-yellow-500 cursor-pointer" />
                <img src={mail.avatar} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold">{mail.sender}</div>
                  <div className="text-sm text-gray-500">{mail.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full bg-${mail.label}-500`}></span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({
  label,
  icon,
  count,
}: {
  label: string;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
      <div className="flex items-center gap-3 text-gray-700">
        {icon}
        {label}
      </div>

      {count && (
        <div className="text-xs bg-gray-200 rounded-full px-2 py-0.5 text-gray-700">
          {count}
        </div>
      )}
    </div>
  );
}

function LabelItem({ color, text }: { color: string; text: string }) {
  return (
    <div className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
      <span className={`w-3 h-3 rounded-full bg-${color}-500`}></span>
      <span>{text}</span>
    </div>
  );
}
