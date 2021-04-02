import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <i
        className={this.props.liked ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
        onClick={() => this.props.onLike()}
      ></i>
    );
  }
}

export default Like;
