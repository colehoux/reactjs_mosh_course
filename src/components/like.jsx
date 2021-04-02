import React, { Component } from "react";

class Like extends Component {
  state = { liked: false };
  handleLike = () => {
    const liked = !this.state.liked;
    this.setState({ liked });
  };
  render() {
    return (
      <i
        class={this.state.liked ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
        onClick={() => this.handleLike()}
      ></i>
    );
  }
}

export default Like;
