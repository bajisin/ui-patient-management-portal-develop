import React from "react";
import Select from "react-select";

const CustomSelect = ({ label, required, options, onChange, value = null, ...rest }) => {
  return (
    <React.Fragment>
      <div className="dropdown-text">
        <h2 className="dropdown-label-text mb-2">
          {label}
          {required && <span className="eq-mandatory-text">*</span>}
        </h2>
      </div>
      <Select
        classNamePrefix="custom-select"
        className="custom-select-container"
        onChange={(opt) => onChange(opt)}
        options={options}
        value={value ? options?.filter((el) => el.value === value) : null}
        {...rest}
      />
    </React.Fragment>
  );
};

export default CustomSelect;
