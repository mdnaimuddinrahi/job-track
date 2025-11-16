"use client";

import { useEffect } from "react";
import {
  Search,
  X,
  BarChart3,
  ShoppingCart,
  Truck,
  Calendar,
  FileText,
  Users,
  Shield,
  User,
  Settings,
  Tag,
  HelpCircle,
  Layout,
  CheckSquare,
  Wand2,
  LineChart,
} from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="mt-20 w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center border-b p-4">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none text-gray-700 placeholder:text-gray-400"
            autoFocus
          />
          <span className="text-sm text-gray-400">[esc]</span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 text-sm">
          {/* Popular Searches */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
              Popular Searches
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <BarChart3 className="w-4 h-4" /> Analytics
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Users className="w-4 h-4" /> CRM
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <ShoppingCart className="w-4 h-4" /> eCommerce
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Truck className="w-4 h-4" /> Logistics
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
              Apps
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Calendar className="w-4 h-4" /> Calendar
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <FileText className="w-4 h-4" /> Invoice List
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <User className="w-4 h-4" /> User List
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Shield className="w-4 h-4" /> Roles & Permissions
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
              Pages
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <User className="w-4 h-4" /> User Profile
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Settings className="w-4 h-4" /> Account Settings
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Tag className="w-4 h-4" /> Pricing
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <HelpCircle className="w-4 h-4" /> FAQ
              </li>
            </ul>
          </div>

          {/* Forms & Charts */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
              Forms & Charts
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Layout className="w-4 h-4" /> Form Layouts
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <CheckSquare className="w-4 h-4" /> Form Validation
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <Wand2 className="w-4 h-4" /> Form Wizard
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                <LineChart className="w-4 h-4" /> Apex Charts
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 flex items-center justify-center gap-6 text-xs text-gray-500 py-2">
          <span>↑↓ to navigate</span>
          <span>↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
