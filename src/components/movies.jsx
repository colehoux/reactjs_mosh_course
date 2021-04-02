import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;
    if (movies.length > 0) {
      return (
        <React.Fragment>
          <h4 className="mb-4">
            Showing {movies.length} movies in the database
          </h4>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
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
                    <Like onLike={() => this.handleLike(m)} liked={m.liked} />
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
        </React.Fragment>
      );
    }
    return <h4 className="my-4">There are no movies in the database.</h4>;
  }
}

export default Movies;
