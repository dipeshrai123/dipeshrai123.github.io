import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { colors } from "../../../modules/colors.module";

export const SelectField = ({
  options,
  formatGroupLabel,
  onChangeValue,
  getOptionLabel = "label",
  getOptionValue = "id",
  isSearchable,
  isClearable,
  placeholder,
  isLoading,
  defaultValue,
  isMulti,
  value,
  isOptionDisabled,
  formatOptionLabel,
  instanceId = "react-select",
  borderless,
}) => {
  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 4,
      borderColor: borderless
        ? "transparent"
        : isFocused
        ? colors.light.primary200
        : colors.light.grey200,
      backgroundColor: "#F8F8F8",
      boxShadow: isFocused && "none",
      "&:hover": {
        borderColor: borderless ? "transparent" : colors.light.primary200,
      },
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? colors.light.primary200 : "#fff",
        "&:hover": {
          backgroundColor: isSelected
            ? colors.light.primary200
            : colors.light.grey400,
        },
      };
    },
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
  };

  let optionLabel;
  if (typeof getOptionLabel === "string") {
    optionLabel = (option) => `${option[getOptionLabel]}`;
  } else if (typeof getOptionLabel === "function") {
    optionLabel = getOptionLabel;
  }

  let optionValue;
  if (typeof getOptionValue === "string") {
    optionValue = (option) => `${option[getOptionValue]}`;
  } else if (typeof getOptionValue === "function") {
    optionValue = getOptionValue;
  }

  return (
    <div>
      <Select
        formatOptionLabel={formatOptionLabel}
        isOptionDisabled={isOptionDisabled}
        isMulti={isMulti}
        instanceId={instanceId}
        className="selectfield"
        classNamePrefix="react-select"
        styles={selectStyles}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isLoading={isLoading}
        onChange={onChangeValue}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
        options={options}
        formatGroupLabel={formatGroupLabel}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
};

SelectField.propTypes = {
  data: PropTypes.any,
  isViewing: PropTypes.bool,
  getOptionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  getOptionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
};

SelectField.defaultProps = {
  getOptionLabel: "label",
  getOptionValue: "id",
};
