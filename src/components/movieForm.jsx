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
        genres: [],
        errors: {},
    };

    schema = {
        _id: Joi.empty(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };
    componentDidMount() {
        this.setState({ genres: getGenres() });

        const movieId = this.props.match.params.id;

        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");

        // const newMovie = { ...movie, genreId: movie.genre._id };
        // delete newMovie.genre;
        // this.setState({ data: newMovie });
        this.setState({ data: this.mapToViewModel(movie) });
        // this.setState({ data: { ...movie, genre: movie.genre._id } });
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }

    doSubmit = () => {
        saveMovie(this.state.data);
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
                        {this.renderSelect("genreId", "Genre", genres)}
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
