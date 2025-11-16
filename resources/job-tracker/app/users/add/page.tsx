"use client";

import { useState } from "react";
import { UserPlus, Mail, Phone, Lock } from "lucide-react";

export default function AddUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New User Data:", form);
    // TODO: call API or mutation
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
      </div>

      {/* Card */}
      <div className="bg-white shadow-sm rounded-xl border p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full py-2 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Phone className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full py-2 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full py-2 outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
