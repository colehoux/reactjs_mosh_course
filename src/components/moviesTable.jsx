import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
    const { movies, onDelete, onLike } = props;
    return (
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
                            <Like onLike={() => onLike(m)} liked={m.liked} />
                        </td>
                        <td>
                            <button
                                onClick={() => onDelete(m._id)}
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
    );
};

export default MoviesTable;
