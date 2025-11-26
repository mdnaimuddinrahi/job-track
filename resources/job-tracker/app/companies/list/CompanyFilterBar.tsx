"use client";
import { useState } from "react";
import InputText from "@/components/Form/InputText";
import dynamic from "next/dynamic";
import SearchSection from "@/components/Section/SearchSection";

// instead of of this I can use useffect for rendering or loading type for prevent ssr leading errors.
const InputSelect = dynamic(() => import("@/components/Form/InputSelect"), {
  ssr: false,
});

const InputMultiSelect = dynamic(
  () => import("@/components/Form/InputMultiSelect"),
  {
    ssr: false,
  }
);
type Option = /*unresolved*/ any

export default function CompanyFilterBar({ filters, setFilters }: any) {
  const [role, setRole] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const roleOptions = [
    {value: "", label: "All"},
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "viewer", label: "Viewer" },
];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "banned", label: "Banned" },
  ];
  

  const handleClear = () =>
    setFilters({
      search: "",
      role: [],
      status: [],
      dateRange: { from: null, to: null },
    });


  return (
    <SearchSection>
      <InputText label="Company Name" name="search" id="search" />
      <InputSelect
        name="role"
        label="Role"
        value={role}
        onChange={setRole}
        options={roleOptions}
      />
      <InputMultiSelect
        name="status"
        label="Status"
        value={status}
        onChange={setStatus}
        options={statusOptions}
      />

    </SearchSection>
  );
}
