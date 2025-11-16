"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");
  const menuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
  ];

  // Close when clicking outside
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
      {/* Globe icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Globe className="w-5 h-5 text-gray-600" />
      </button>

      {/* Tooltip dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 animate-fadeIn">
          <div className="px-4 py-2 border-b">
            <h3 className="text-sm font-semibold text-gray-800">Language</h3>
          </div>
          <ul className="py-2 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    setSelected(lang.name);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 transition ${
                    selected === lang.name ? "bg-gray-50 font-semibold" : ""
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left text-gray-700">
                    {lang.name}
                  </span>
                  {selected === lang.name && (
                    <span className="text-blue-500 text-xs font-medium">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
