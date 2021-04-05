import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4,
    };
    handleDelete = (movieId) => {
        const movies = this.state.movies.filter((m) => m._id !== movieId);
        this.setState({ movies });
    };
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render() {
        const { length: count } = this.state.movies;

        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (count === 0) {
            return (
                <h4 className="my-4">There are no movies in the database.</h4>
            );
        }

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment>
                <h4 className="mb-4">Showing {count} movies in the database</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((m) => (
                            <tr key={m._id}>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td>{m.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        onLike={() => this.handleLike(m)}
                                        liked={m.liked}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(m._id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            //   <tr key={m._id}>
                            //     <td>{m.title}</td>
                            //     <td>{m.genre}</td>
                            //   </tr>
                        ))}
                        {/* {this.state.movies.pop()._id} */}
                    </tbody>
                </table>
                {/* table.table>thead>tr>th*4 */}
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Movies;
