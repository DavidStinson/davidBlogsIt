import React from "react";

const Input = ({ name, label, handleChange, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={handleChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
        autoComplete="off"
      />
      <div>{error && <div className="alert alert-danger">{error}</div>}</div>
    </div>
  );
};

export default Input;