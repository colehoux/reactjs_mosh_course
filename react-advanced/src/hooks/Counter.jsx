import React, { Fragment, useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

export default function Counter(props) {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    useDocumentTitle(`${name} clicked ${count} times`);

    return (
        <Fragment>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <div>
                {name} has clicked {count} times
            </div>
            <button onClick={() => setCount(count + 1)}>Yeet up</button>
        </Fragment>
    );
}
