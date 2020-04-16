import React from "react";
import * as postAPI from '../../services/post-api';
import DeleteButton from "../common/DeleteButton/DeleteButton"

const Post = ({post, user, handleDeletedPost}) => {
  function doDelete(postId) {
    handleDeletedPost(postId)
  }


  return (
    <React.Fragment>
      <h3>{post.title}</h3>
      <p>{post.author}</p>
      <h4>{post.topic}</h4>
      <br />
      {post.content.map(content =>
        <p key={content._id}>{content.data}</p>
      )}
      {(user.isAdmin || user._id === post.authorRef._id) && (

        <DeleteButton label="Delete Post" itemId={post._id} api={postAPI} doDelete={doDelete}/>
      )}
    </React.Fragment>
  );
};

export default Post;
