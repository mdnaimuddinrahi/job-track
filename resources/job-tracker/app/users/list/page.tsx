"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import UserTable from "./UserTable";
import Pagination from "@/components/Pagination";

export default function UserListPage() {
  const [filters, setFilters] = useState({
    search: "",
    role: [],
    status: [],
    dateRange: { from: null, to: null },
  });

  const [page, setPage] = useState(1);

  return (
    <div className="p-2" >
      {/* <h1 className="text-2xl font-bold mb-4">Users</h1>z */}

      <FilterBar filters={filters} setFilters={setFilters} />
        
      <div className="mt-6 bg-white border rounded-xl shadow-sm">
        <UserTable filters={filters} />
      </div>

      <div className="mt-4">
        <Pagination current={page} total={25} onPageChange={setPage} />
      </div>
    </div>
  );
}
