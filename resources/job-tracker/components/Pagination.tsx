import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  current,
  total,
  onPageChange,
}: {
  current: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center bg-white border rounded-xl px-4 py-2 shadow-sm">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="flex items-center gap-1 text-sm text-gray-600 disabled:text-gray-400"
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      <div className="flex gap-1">
        {pages.slice(0, 5).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 text-sm rounded ${
              p === current
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
        className="flex items-center gap-1 text-sm text-gray-600 disabled:text-gray-400"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
