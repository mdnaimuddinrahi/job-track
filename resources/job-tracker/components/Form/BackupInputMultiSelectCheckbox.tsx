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
  const extra = selected.length;

  return (
    <components.ValueContainer {...props}>
      <div className="truncate flex gap-1">

        {extra > 0 && (
          <span className="text-gray-500">{extra} selected columns</span>
        )}
      </div>
    </components.ValueContainer>
  );
};

type Props = {
  columnOptions: { value: string; label: string }[];
};

const InputMultiSelectCheckbox = ({columnOptions}: Props) => {
  

  return (
    <Select
      options={columnOptions}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: CheckboxOption,
        MultiValue,
        ValueContainer,
      }}
      className="text-xs"
      placeholder="Select Columns..."
      styles={{
        valueContainer: (base) => ({
          ...base,
          display: "flex",
          overflow: "hidden",
        }),
        multiValue: () => ({ display: "none" }),
        control: (base) => ({
          ...base,
          minHeight: 42,
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
};

export default InputMultiSelectCheckbox;
