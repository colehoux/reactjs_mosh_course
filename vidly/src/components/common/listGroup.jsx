import React from "react";

const ListGroup = ({
    items,
    textProprety,
    valueProprety,
    onItemSelect,
    selectedItem,
}) => {
    return (
        <ul className="list-group">
            {items.map((item) => (
                <li
                    onClick={() => onItemSelect(item)}
                    key={item[valueProprety]}
                    className={
                        item._id === selectedItem._id
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                >
                    {item[textProprety]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProprety: "name",
    valueProprety: "_id",
};

export default ListGroup;
