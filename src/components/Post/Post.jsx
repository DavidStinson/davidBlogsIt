import React from "react";

const Post = ({post, user}) => {
  
  return (
    <React.Fragment>
      <h3>{post.title}</h3>
      <p>{post.author.name}</p>
      <h4>{post.topic}</h4>
      <br />
      {post.content.map(content =>
        <p key={content._id}>{content.content}</p>
      )}
    </React.Fragment>
  );
};

export default Post;
