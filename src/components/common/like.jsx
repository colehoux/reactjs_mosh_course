import React, { Component } from "react";

const Like = (props) => {
  // let classes = "fa fa-heart";
  // if (!this.props.liked) classes += "-o";
  return (
    <i
      className={"fa fa-heart" + (props.liked ? "" : "-o")}
      // className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={() => props.onLike()}
    ></i>
  );
};

export default Like;
