import React from "react";


// ...rest includes value, type, and handleChange
const Input = ({ name, label, handleChange, value, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-control"
        autoComplete="off"
      />
      <div>{error && <div className="alert alert-danger">{error}</div>}</div>
    </div>
  );
};

export default Input;