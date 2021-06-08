import React, { Fragment, useState, useEffect } from "react";

export default function Counter(props) {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    useEffect(() => {
        document.title = `${name} has clicked ${count} times!`;

        return () => {
            //cleanup
        };
    }, [count, name]);

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
