// src/app/not-found.tsx
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Home className="w-4 h-4" />
        Go Home
      </Link>
    </div>
  );
}
