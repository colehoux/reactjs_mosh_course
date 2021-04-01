import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });
  };
  renderMovies() {
    const { movies } = this.state;
    if (movies.length > 0) {
      return (
        <React.Fragment>
          <h4 className="my-4">
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
                  <td>{m.stock}</td>
                  <td>{m.numberInStock}</td>
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
        </React.Fragment>
      );
    } else {
      return <h4 className="my-4">There are no movies in the database.</h4>;
    }
  }

  render() {
    console.log(this.state.movies);
    return <React.Fragment>{this.renderMovies()}</React.Fragment>;
  }
}

export default Movies;
