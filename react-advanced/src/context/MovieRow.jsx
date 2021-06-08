import React, { useContext } from "react";
import UserContext from "./userContext";

export default function MovieRow() {
    const userContext = useContext(UserContext);

    return <div>Movie row - {userContext.currentUser ? userContext.currentUser.name : ""}</div>;
}
