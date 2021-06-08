import React, { useContext } from "react";
import UserContext from "./userContext";

export default function MovieRow() {
    const currentUser = useContext(UserContext);

    return <div>{currentUser.name}</div>;
}
