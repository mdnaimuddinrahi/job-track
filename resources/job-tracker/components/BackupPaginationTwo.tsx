export default function PaginationTwo() {
  return (
    <div className="flex justify-between items-center mt-4">

  {/* Left text */}
  <p className="text-sm text-gray-500">
    Showing 1 to 10 of 50 entries
  </p>

  {/* Pagination */}
  <div className="flex items-center gap-2">

    {/* First */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
      «
    </button>

    {/* Prev */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
      ‹
    </button>

    {/* Page numbers */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 text-white font-medium">
      1
    </button>

    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
      2
    </button>

    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
      3
    </button>

    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
      4
    </button>

    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
      5
    </button>

    {/* Ellipsis */}
    <span className="px-2 text-gray-400">…</span>

    {/* Last page */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
      10
    </button>

    {/* Next */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
      ›
    </button>

    {/* Last */}
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
      »
    </button>

  </div>
</div>

      )}