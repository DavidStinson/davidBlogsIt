import React from "react";

const Post = props => {
  console.log(props)
  return (
    <React.Fragment>
      <h3>test</h3>

      {props.posts.map}
    </React.Fragment>
  );
};

export default Post;
