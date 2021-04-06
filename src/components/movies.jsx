import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        genreFilters: getGenres(),
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: "title", order: "asc" },
        // currentFilter: null,
        // selectedGenre: null,
    };
    componentDidMount() {
        const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }
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

    // handleFilterChange = (filter) => {
    //     this.setState({ currentFilter: filter });
    // };
    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = (path) => {
        const sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.setState({ sortColumn });
    };

    render() {
        const { length: count } = this.state.movies;

        const {
            pageSize,
            currentPage,
            sortColumn,
            movies: allMovies,
            genres,
            selectedGenre,
            // genreFilters,
            // currentFilter,
        } = this.state;

        if (count === 0) {
            return (
                <h4 className="my-4">There are no movies in the database.</h4>
            );
        }

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
                : allMovies;
        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );
        const movies = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-2">
                    {/* <Filtering
                        filters={genreFilters}
                        onFilterChange={this.handleFilterChange}
                        currentFilter={currentFilter}
                    /> */}

                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <h4 className="mb-4">
                        Showing {filtered.length} movies in the database
                    </h4>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    {/* table.table>thead>tr>th*4 */}
                    <Pagination
                        itemsCount={filtered.length}
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
