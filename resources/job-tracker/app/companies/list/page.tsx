"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import CompanyTable from "./CompanyTable";
import Pagination from "@/components/Pagination";
import PaginationTwo from "@/components/PaginationTwo";
import InputMultiSelectCheckbox from "@/components/Form/InputMultiSelectCheckbox";
import ListHeading from "@/components/ListHeading";

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
      <div className=" bg-white rounded-md shadow-sm">
        <ListHeading title="Companies List" />
        <hr className="border-t border-gray-100 mb-3" />
        <FilterBar/>
        <CompanyTable />
        <hr className="border-t border-gray-100 mb-3" />
        <PaginationTwo
          total={750}
          perPage={10}
          page={page}
          onChange={setPage}
        />
      </div>

    </div>
  );
}
