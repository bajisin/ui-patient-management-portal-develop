import React from "react";

function RadioButton({ name, value, title, checked, onChange }) {
  return (
    <label onClick={onChange}>
      <input type="radio" name={name} value={value} readOnly checked={checked} />
      <span className="search-item">{title}</span>
    </label>
  );
}

export default RadioButton;
