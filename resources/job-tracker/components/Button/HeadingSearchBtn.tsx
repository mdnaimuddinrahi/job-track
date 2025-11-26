import { Search } from "lucide-react";

export default function HeadingSearchBtn() {
  return (
    <div>
        {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
              <Search className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Search</span>
            </button> */}
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm">
              <Search className="w-4 h-4" />
              Search
            </button> */}
{/* <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
  <Search className="w-4 h-4 text-gray-500" />
  Search
</button> */}
{/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition">
  <Search className="w-4 h-4 text-gray-400" />
  <span className="text-sm text-gray-700">Search</span>
</button> */}

{/* <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
  <Search className="w-4 h-4 text-gray-600" />
</button> */}
{/* <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition">
  <Search size={16} className="text-gray-500" />
  <span className="text-sm">Search</span>
</button> */}
{/* <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-blue-300 transition hover:border-blue-300 hover:text-blue-50">
  <Search size={16} className="text-gray-500 hover:text-blue-50" />
  <span className="text-sm text-gray-700 hover:text-blue-50">Search</span>
</button> */}
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300 transition">
  <Search size={16} className="text-gray-500" />
  <span className="text-sm text-gray-700">Search</span>
</button>
    </div>
  );
}