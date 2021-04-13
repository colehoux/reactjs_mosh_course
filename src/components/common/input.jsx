import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default Input;
