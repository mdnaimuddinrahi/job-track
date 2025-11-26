"use client";

interface PaginationProps {
  total: number;       // total items
  perPage: number;     // items per page
  page: number;        // current page
  onChange: (page: number) => void;
}

export default function PaginationTwo({
  total,
  perPage,
  page,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange(p);
  };

  return (
    <div className="px-4 pb-4 flex justify-between items-center mt-4 w-full">

      <p className="text-sm text-gray-500">
        Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} entries
      </p>

      <div className="flex items-center gap-2">

        {/* First */}
        <button
          onClick={() => goToPage(1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          «
        </button>

        {/* Prev */}
        <button
          onClick={() => goToPage(page - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          disabled={page === 1}
        >
          ‹
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={i}
              onClick={() => goToPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${
                  p === page
                    ? "bg-indigo-500 text-white font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => goToPage(page + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          disabled={page === totalPages}
        >
          ›
        </button>

        {/* Last */}
        <button
          onClick={() => goToPage(totalPages)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          »
        </button>

      </div>
    </div>
  );
}
