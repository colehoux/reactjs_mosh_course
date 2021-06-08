import React, { Component } from "react";
import UserContext from "./userContext";

export default class MovieList extends Component {
    static contextType = UserContext;

    componentDidMount() {
        console.log("context", this.context);
    }

    render() {
        return (
            <UserContext.Consumer>
                {(UserContext) => <div>{UserContext.name}'s Movie list</div>}
            </UserContext.Consumer>
        );
    }
}
