import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./userContext";

export default class MovieList extends Component {
    static contextType = UserContext;

    componentDidMount() {
        console.log("context", this.context);
    }

    render() {
        return (
            <UserContext.Consumer>
                {(UserContext) => (
                    <div>
                        {UserContext.name}'s Movie list
                        <MovieRow />
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}
