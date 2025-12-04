import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";

const CheckboxOption = (props: any) => {
  // don't let the checkbox click swallow the option click behavior
  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // stop default so react-select handles selection
    // but DO NOT stopPropagation — allow outer click detection to work
    e.preventDefault();
    // trigger the option click manually (select/deselect)
    props.selectOption(props.data);
  };

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => {}}
          onClick={onInputClick}
        />
        <label className="select-none">{props.label}</label>
      </div>
    </components.Option>
  );
};

// hide default pills
const MultiValue = () => null;

const ValueContainer = (props: any) => {
  const { children, getValue } = props;
  const selected = getValue ? getValue() : [];
  const MAX_VISIBLE = 2;

  if (!selected.length) {
    return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
  }

  const visible = selected.slice(0, MAX_VISIBLE);
  const extra = selected.length - MAX_VISIBLE;

  return (
    <components.ValueContainer {...props}>
      <div className="truncate flex gap-1 items-center">
        {visible.map((v: any, i: number) => (
          <span key={i} className="text-sm text-gray-700">
            {v.label}
            {i < visible.length - 1 ? "," : ""}
          </span>
        ))}

        {extra > 0 && <span className="text-sm text-gray-500"> +{extra} more</span>}
      </div>
    </components.ValueContainer>
  );
};

type Props = {
  columnOptions: { value: string; label: string }[];
};

const InputMultiSelectCheckbox = ({ columnOptions }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    // Click outside handler
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    // Keydown handler for ESC
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // menuPortalTarget guard for SSR
  const portalTarget = typeof document !== "undefined" ? document.body : undefined;

  return (
    <div ref={wrapperRef} className="w-full">
      <Select
        ref={selectRef}
        options={columnOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        // clicking the control toggles open state
        onFocus={() => setMenuIsOpen(true)}
        components={{
          Option: CheckboxOption,
          MultiValue,
          ValueContainer,
        }}
        className="text-xs"
        placeholder="Select Columns..."
        menuPortalTarget={portalTarget}
        styles={{
          valueContainer: (base) => ({
            ...base,
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
          }),
          multiValue: () => ({ display: "none" }),
          control: (base) => ({
            ...base,
            minHeight: 42,
            zIndex: 20,
            borderRadius: "0.5rem",
            borderColor: "#E5E7EB",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
};

export default InputMultiSelectCheckbox;
