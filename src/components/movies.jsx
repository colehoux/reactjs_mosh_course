import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        genreFilters: getGenres(),
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: "title", order: "asc" },
        selectedGenre: { _id: "", name: "All genres" },
        // currentFilter: null,
        // selectedGenre: null,
    };
    componentDidMount() {
        const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }
    handleDelete = (movieId) => {
        const deletedMovie = deleteMovie(movieId);

        const movies = this.state.movies.filter((m) => m._id !== deletedMovie._id);
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

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, movies: allMovies, selectedGenre } = this.state;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
                : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, genres } = this.state;

        if (count === 0) {
            return <h4 className="my-4">There are no movies in the database.</h4>;
        }

        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary mb-4">
                        New Movie
                    </Link>
                    <h4 className="mb-4">Showing {totalCount} movies in the database</h4>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    {/* table.table>thead>tr>th*4 */}
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
