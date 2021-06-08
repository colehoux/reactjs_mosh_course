import React, { useContext } from "react";
import CartContext from "./carteContext";
import UserContext from "./userContext";

export default function MovieRow() {
    const userContext = useContext(UserContext);
    const cartContext = useContext(CartContext);
    console.log("Cart Context", cartContext);

    return <div>Movie row - {userContext.currentUser ? userContext.currentUser.name : ""}</div>;
}
