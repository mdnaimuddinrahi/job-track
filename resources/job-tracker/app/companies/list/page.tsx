"use client";
import { useState } from "react";
import CompanyFilterBar from "./CompanyFilterBar";
import CompanyTable from "./CompanyTable";
import PaginationTwo from "@/components/Pagination";
import HeadingSection from "@/components/Section/HeadingSection";

export default function UserListPage() {
  
  const [filters, setFilters] = useState({
    search: "",
    role: [],
    status: [],
    dateRange: { from: null, to: null },
  });
  const [globalSearch, setGlobalSearch] = useState("");
  const columnOptions = [
    { value: "oliver", label: "Oliver Hansen" },
    { value: "van", label: "Van Henry" },
    { value: "april", label: "April Tucker" },
    { value: "ralph", label: "Ralph Hubbard" },
    { value: "snyder", label: "Kelly Snyder" },
    { value: "carlos", label: "Carlos Abbott" },
  ];


  const [page, setPage] = useState(1);

  return (
    <div className="" >
      <div className=" bg-white rounded-md shadow-sm">
        <HeadingSection title="Companies List" columnOptions={columnOptions} />
        <hr className="border-t border-gray-100 mb-3" />
        <CompanyFilterBar filters={filters} setFilters={setFilters} />
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
