"use client";
import { X } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";

export default function FilterBar({ filters, setFilters }: any) {
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "banned", label: "Banned" },
  ];
  

  const handleClear = () =>
    setFilters({
      search: "",
      role: [],
      status: [],
      dateRange: { from: null, to: null },
    });

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-end">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold mb-1">Search</label>
        <input
          type="text"
          placeholder="Search user..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-52"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Role Multi Select */}
      <div>
        <label className="block text-xs font-semibold mb-1">Role</label>
        <Select
          isMulti
          value={filters.role}
          options={roleOptions}
          className="w-48 text-sm"
          onChange={(selected) => setFilters({ ...filters, role: selected })}
        />
      </div>

      {/* Status Multi Select */}
      <div>
        <label className="block text-xs font-semibold mb-1">Status</label>
        <Select
          isMulti
          value={filters.status}
          options={statusOptions}
          className="w-48 text-sm"
          onChange={(selected) => setFilters({ ...filters, status: selected })}
        />
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="block text-xs font-semibold mb-1">Date Range</label>
        <Datepicker
          value={filters.dateRange}
          onChange={(newValue) =>
            setFilters({ ...filters, dateRange: newValue })
          }
          showShortcuts={true}
          inputClassName="border border-gray-300 rounded-lg px-3 py-2 w-70"
        />
      </div>

      {/* Clear */}
      <button
        onClick={handleClear}
        className="ml-auto flex items-center gap-2 text-sm text-gray-600 hover:text-red-600"
      >
        <X className="w-4 h-4" /> Clear Filters
      </button>
    </div>
  );
}
