import React from "react";
import Select, { components } from "react-select";

// Checkbox UI inside dropdown
const CheckboxOption = (props: any) => (
  <components.Option {...props}>
    <div className="flex items-center gap-2">
      <input type="checkbox" checked={props.isSelected} readOnly />
      <label>{props.label}</label>
    </div>
  </components.Option>
);

// Replace selected tag pills with custom "limited text"
const MultiValue = () => null; // Hide default pills completely

// Shows only 2 values + "+X more"
const ValueContainer = (props: any) => {
  const { children, getValue } = props;
  const selected = getValue();

  const MAX_VISIBLE = 2;

  if (!selected.length) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  const visible = selected.slice(0, MAX_VISIBLE);
  const extra = selected.length - MAX_VISIBLE;

  return (
    <components.ValueContainer {...props}>
      <div className="truncate flex gap-1">
        {visible.map((v: any, i: number) => (
          <span key={i}>{v.label}{i < visible.length - 1 ? ',' : ''}</span>
        ))}

        {extra > 0 && (
          <span className="text-gray-500">+{extra} more</span>
        )}
      </div>
    </components.ValueContainer>
  );
};

const InputMultiSelectCheckbox = () => {
  const options = [
    { value: "oliver", label: "Oliver Hansen" },
    { value: "van", label: "Van Henry" },
    { value: "april", label: "April Tucker" },
    { value: "ralph", label: "Ralph Hubbard" },
    { value: "snyder", label: "Kelly Snyder" },
    { value: "carlos", label: "Carlos Abbott" },
  ];

  return (
    <Select
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: CheckboxOption,
        MultiValue,
        ValueContainer,
      }}
      placeholder="Select options..."
      styles={{
        valueContainer: (base) => ({
          ...base,
          padding: "6px",
          display: "flex",
          overflow: "hidden",
        }),
        multiValue: () => ({ display: "none" }),
        control: (base) => ({
          ...base,
          minHeight: 42,
        }),
      }}
    />
  );
};

export default InputMultiSelectCheckbox;
