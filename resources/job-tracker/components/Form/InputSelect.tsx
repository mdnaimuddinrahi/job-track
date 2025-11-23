

import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  name: string;
  id?: string | null;
  label?: string;
  value: Option | null;
  onChange: (v: Option | null) => void;
  options: Option[];
}

export default function InputSelect({
  name,
  id,
  label,
  value,
  onChange,
  options,
}: FloatingSelectProps) {
  const inputId = id ?? name;
  const hasValue = !!value;
// const isFloating = hasValue; // Add this state
  return (
    <div className="relative w-64">
      {/* Floating Label */}
      
        <label
          htmlFor={inputId}
          className={`
            absolute left-3 px-1 bg-white z-20 transition-all pointer-events-none
            ${hasValue ? "-top-2 text-xs text-gray-600" : "top-2 text-sm text-gray-400"}
          `}
        >
          {label ?? name}
        </label>


<Select
  inputId={inputId}
  value={value}
  onChange={(v) => onChange(v)}
  options={options}
  placeholder=""  // <-- IMPORTANT: Remove space placeholder
  isClearable   
  // classNamePrefix="rs"
  className="text-xs"
  styles={{
    control: (base, state) => ({
      ...base,
      borderRadius: 6,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "#3b82f6" : "#9ca3af",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": { borderColor: state.isFocused ? "#3b82f6" : "#9ca3af" },
    }),
    valueContainer: (base) => ({
      ...base,
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
