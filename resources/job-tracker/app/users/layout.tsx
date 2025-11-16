// src/app/users/layout.tsx
import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users Section</h1>
      {children}
    </div>
  );
}
