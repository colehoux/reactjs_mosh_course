import React, { Component } from "react";

class MovieDetails extends Component {
    state = {};
    handleSave = () => {
        this.props.history.push("/movies");
    };
    render() {
        return (
            <React.Fragment>
                <h1>Movie Form {this.props.match.params.id}</h1>
                <button className="btn btn-primary" onClick={this.handleSave}>
                    Save
                </button>
            </React.Fragment>
        );
    }
}

export default MovieDetails;
