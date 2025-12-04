"use client";

import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FloatingMultiSelectProps {
  name: string;
  id?: string | null;
  label?: string;
  value: Option[];                  // MULTI: array of options
  onChange: (v: Option[]) => void;
  options: Option[];
  minWidth?: string;
}

export default function MultiSelect({
  name,
  id,
  label,
  value,
  onChange,
  options,
  minWidth,
}: FloatingMultiSelectProps) {
  const inputId = id ?? name;
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${minWidth ? `w-${minWidth}` : "w-64"}`}>

      {/* Floating Label */}
      <label
        htmlFor={inputId}
        className={`
          absolute left-3 px-1 bg-white z-10 transition-all pointer-events-none
          ${hasValue ? "-top-2 text-xs text-gray-600" : "top-2 text-sm text-gray-400"}
        `}
      >
        {label ?? name}
      </label>

      <Select
        inputId={inputId}
        value={value}
        isMulti                          // <--- IMPORTANT
        isClearable                      // <--- Allows clearing all selected
        onChange={(v) => onChange(v as Option[])}
        options={options}
        placeholder=""
        classNamePrefix="rs"
        className="text-xs"
        closeMenuOnSelect={false}       // <--- Better UX for multi select
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: 6,
            backgroundColor: "transparent",
            minHeight: 40,
            borderColor: state.isFocused ? "#3b82f6" : "#9ca3af",
            boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
            "&:hover": { borderColor: state.isFocused ? "#3b82f6" : "#9ca3af" },
          }),
          multiValue: (base) => ({
            ...base,
            borderRadius: 4,
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: hasValue ? 6 : 2,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
}
