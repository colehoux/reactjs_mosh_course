import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
        genres: getGenres(),
    };

    schema = {
        _id: Joi.empty(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };
    componentDidMount() {
        const { id } = this.props.match.params;

        if (id && id.trim() !== "" && id !== "new") {
            const movie = getMovie(id);
            if (!movie) {
                this.props.history.replace("/not-found");
            } else {
                const newMovie = { ...movie, genreId: movie.genre._id };
                delete newMovie.genre;
                this.setState({ data: newMovie });
                // this.setState({ data: { ...movie, genre: movie.genre._id } });
            }
        }
    }

    doSubmit = () => {
        const movies = saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    render() {
        const { genres, data } = this.state;
        return (
            <React.Fragment>
                <div>
                    <h1>Movie Form {data._id && data._id}</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("title", "Title")}
                        {this.renderSelect("genreId", "Genre", genres, "_id", "name", data.genreId)}
                        {this.renderInput("numberInStock", "Number in Stock", "number")}
                        {this.renderInput("dailyRentalRate", "Rate")}
                        {this.renderButton("Save")}
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default MovieForm;
