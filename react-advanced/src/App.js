// import logo from "./logo.svg";
// import "./App.css";
// import Movie from "./hoc/Movie";
// import Counter from "./hooks/Counter";
// import Users from "./hooks/Users";

// function App() {
//     // return <Movie id="12334567" />;
//     // return <Counter />;
//     // return <Users />;
//     return <Users />;
// }

// export default App;

import React, { Component, createRef } from "react";
import Login from "./context/Login";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";
import CartContext from "./context/carteContext";

export default class App extends Component {
    handleLoggedIn = (username) => {
        console.log("Getting the user: " + username);
        const user = { name: "Charlo" };
        this.setState({ currentUser: user });
    };

    state = { currentUser: null };

    render() {
        return (
            <CartContext.Provider value={{ cart: [] }}>
                <UserContext.Provider
                    value={{
                        currentUser: this.state.currentUser,
                        onLoggedIn: this.handleLoggedIn,
                    }}
                >
                    <div>
                        <MoviePage />
                        <Login />
                    </div>
                </UserContext.Provider>
            </CartContext.Provider>
        );
    }
}
