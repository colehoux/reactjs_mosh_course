import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                {...rest}
                className={`custom-select ${error ? "is-invalid" : ""}`}
            >
                <option value="" />
                {options.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default Select;
