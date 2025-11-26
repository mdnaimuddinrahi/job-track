import { useState } from "react";
import HeadingSearchBtn from "@/components/Button/HeadingSearchBtn";
import dynamic from "next/dynamic";
const InputSelect = dynamic(() => import("@/components/Form/InputSelect"), {
  ssr: false,
});
const InputMultiSelectCheckbox = dynamic(() => import("@/components/Form/InputMultiSelectCheckbox"), {
  ssr: false,
});

export default function HeadingSection({ title }: { title: string }) {
  const [perPage, setPerPage] = useState<{ value: string; label: string }>({
    value: "10",
    label: "10",
  });
  const pageOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
  return (
    <div className="p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* Global Search */}
        <div className="flex items-end gap-2">
        
          <InputSelect
            name="perpage"
            label="Per Page"
            value={perPage}
            onChange={(v) => v && setPerPage(v)}
            options={pageOptions}
            minWidth="30"
            isClearable={false}
          />
          <InputMultiSelectCheckbox />
          <HeadingSearchBtn />
        </div>
     </div>
  );
}   