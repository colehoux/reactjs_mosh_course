import React from "react";
import PropTypes from "prop-types";

const Filtering = (props) => {
    const { filters, currentFilter, onFilterChange } = props;
    return (
        <ul className="list-group">
            <li
                className={
                    currentFilter === null
                        ? "list-group-item active"
                        : "list-group-item"
                }
                onClick={() => onFilterChange(null)}
            >
                All genres
            </li>
            {filters.map((filter) => (
                <li
                    key={filter._id}
                    className={
                        currentFilter === filter
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    onClick={() => onFilterChange(filter)}
                >
                    {filter.name}
                </li>
            ))}
        </ul>
    );
};

Filtering.propTypes = {
    filters: PropTypes.array.isRequired,
    currentFilter: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired,
};

// Filtering.defaultProps = {
//     currentFilter:
// }
export default Filtering;
