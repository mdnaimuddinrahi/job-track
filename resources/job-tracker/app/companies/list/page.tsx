"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import CompanyTable from "./CompanyTable";
import Pagination from "@/components/Pagination";

export default function UserListPage() {
  const [filters, setFilters] = useState({
    search: "",
    role: [],
    status: [],
    dateRange: { from: null, to: null },
  });
  const [globalSearch, setGlobalSearch] = useState("");


  const [page, setPage] = useState(1);

  return (
    <div className="" >
      {/* <h1 className="text-2xl font-bold mb-4">Users</h1>z */}

      {/* <FilterBar filters={filters} setFilters={setFilters} /> */}

      <div className=" bg-white rounded-md shadow-sm">
        <div className="p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Company List</h2>
          {/* Global Search */}
          <input
            type="text"
            placeholder="Search all columns..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          
        </div>
        <hr className="border-t border-gray-100 mb-3" />
        <FilterBar/>
        <CompanyTable />
        
          {/* Pagination */}
          {/* <div `className="flex justify-between items-center mt-4">

            <p className="text-sm text-gray-500">
              Showing 1 to 10 of 50 entries
            </p>

            <div className="flex items-center gap-2">
              <button className="page-btn">&laquo;</button>
              <button className="page-btn">&lsaquo;</button>

              <button className="page-btn-active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <button className="page-btn">5</button>

              <button className="page-btn">&rsaquo;</button>
              <button className="page-btn">&raquo;</button>
            </div>
          </div> */}`
      </div>

      {/* <div className="mt-4">
        <Pagination current={page} total={25} onPageChange={setPage} />
      </div> */}
    </div>
  );
}
