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

import React, { Component } from "react";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";

export default class App extends Component {
    state = { currentUser: { name: "Charlo" } };

    render() {
        return (
            <UserContext.Provider value={this.state.currentUser}>
                <div>
                    <MoviePage />
                </div>
            </UserContext.Provider>
        );
    }
}
