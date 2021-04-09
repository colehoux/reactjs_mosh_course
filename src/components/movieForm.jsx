import React, { Component } from "react";

class MovieForm extends Component {
    state = {};
    handleSave = () => {
        this.props.history.push("/movies");
    };
    render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <h1>Movie Form {match.params.id}</h1>
                <button className="btn btn-primary" onClick={this.handleSave}>
                    Save
                </button>
            </React.Fragment>
        );
    }
}

export default MovieForm;
