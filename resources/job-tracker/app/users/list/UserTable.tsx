import { useState } from "react";

export default function UserTable({ filters }: any) {
  const [selected, setSelected] = useState<number[]>([]);

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", created_at: "2025-11-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive", created_at: "2025-11-11" },
    { id: 3, name: "Ali Ahmed", email: "ali@example.com", role: "Manager", status: "Active", created_at: "2025-11-12" },
  ];

  const allSelected = selected.length === users.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : users.map((u) => u.id));
  };

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase text-gray-600">
        <tr>
          <th className="p-3">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          </th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="p-3">
              <input
                type="checkbox"
                checked={selected.includes(user.id)}
                onChange={() => toggleOne(user.id)}
              />
            </td>
            <td className="p-3 font-medium">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.role}</td>
            <td className="p-3">
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>
            </td>
            <td className="p-3 text-gray-500">{user.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
