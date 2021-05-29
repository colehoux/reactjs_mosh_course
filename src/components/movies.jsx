import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: "title", order: "asc" },
        selectedGenre: {},
        searchQuery: "",
    };
    async componentDidMount() {
        const { data: genres } = await getGenres();
        genres.splice(0, 0, { _id: "", name: "All genres" });
        const { data: movies } = await getMovies();
        this.setState({ movies, genres });
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
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };
    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            movies: allMovies,
            selectedGenre,
            searchQuery,
        } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter((movie) =>
                movie.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, genres, searchQuery } = this.state;

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
                    <SearchBox onChange={this.handleSearch} value={searchQuery} />
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
