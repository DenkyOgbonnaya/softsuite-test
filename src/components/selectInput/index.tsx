import { ChevronDown } from "@/assets";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import Select, { ActionMeta, StylesConfig, components } from "react-select";
import styles from "./selectInput.module.scss";

type SelectOption = {
  label: string;
  value: string | number;
};
type Event = {
  target: {
    name: string;
    value: any;
  };
};
type SelectProps = ComponentProps<Select>;
interface IProps extends SelectProps {
  options: SelectOption[];
  name: string;
  label?: string;
  value: string | number | string[];
  placeholder: string;
  errorMessage?: string;
  isRequired?: boolean;
  isMulti?: boolean;
  error?: boolean;
  onChangeHandler: (event: Event) => void;
}

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
});

const SelectInput: FC<IProps> = ({
  label,
  errorMessage,
  error,
  isRequired,
  placeholder,
  options,
  name,
  isMulti,
  onChangeHandler,
  value,
  ...rest
}) => {
  const colourStyles: StylesConfig = {
    placeholder: (base, state) => ({
      ...base,
      fontSize: "1rem",
      fontFamily: "Gilroy",
      fontWeight: "500",
      color: "#818DA9",
      display:
        state.isFocused || state.selectProps.inputValue ? "none" : "block",
      width: "100%",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "1rem",
      color: "#8C8F97",
      fontFamily: "Ubuntu",
      fontWeight: "500",
      zIndex: 3,
    }),
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "white",
      paddingRight: "1rem",
      borderRadius: "0.25rem",
      border: !error ? "1px solid #E5E5E5" : "1px solid red",
      height: "3.5rem;",
    }),
    valueContainer: (styles, { isDisabled }) => ({
      ...styles,
      overflow: "visible",
      backgroundColor: isDisabled ? "#E1E1E1" : "transparent",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "#F9F9F9"
          : isSelected
          ? "#F9F9F9"
          : isFocused
          ? "#F9F9F9"
          : undefined,
        color: isDisabled ? "#ccc" : isSelected ? "#818DA9" : "#818DA9",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "##F9F9F9"
              : "#F9F9F9"
            : "white",
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data, isDisabled }) => ({
      ...styles,
      fontSize: "1rem",
      position: "relative",
      color: "#818DA9",
      fontFamily: "Gilroy",
      fontWeight: "500",
      paddingLeft: "0.5rem",
    }),
  };
  const [defaultValue, setDefaultValue] = useState<SelectOption | SelectOption[] | null>();

  useEffect(() => {
    const getDefultValue = () => {
      if (!isMulti && value) {
        const theValue = options.find((option) => option.value === value);
        if (theValue) setDefaultValue(theValue);
      } else if(isMulti){
        if(value && Array.isArray(value)){
          const values = value.map(val => ({label:val, value:val}))
          setDefaultValue(values)
        }
       
      }
    };
    getDefultValue();
  }, [value, options]);

  const handleChange = (value: unknown, actionMeta: ActionMeta<unknown>) => {
    if (isMulti) {
      const theVelue = value as SelectOption[];

      const multiValue = theVelue.map((val) => val.value);
      const event: Event = {
        target: {
          name,
          value: multiValue,
        },
      };
      onChangeHandler(event);
    } else {
      const theValue = value as SelectOption;
      const event: Event = {
        target: {
          name,
          value: theValue.value,
        },
      };
      onChangeHandler(event);
    }
  };

  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        options={options}
        styles={colourStyles}
        placeholder={placeholder}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => <ChevronDown color="#818DA9" />,
        }}
        value={defaultValue}
        onChange={handleChange}
        isMulti={isMulti}
        {...rest}
      />
      {errorMessage && (
        <div className={styles.errorWrap}>
          <span className={styles.errorLabel}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
