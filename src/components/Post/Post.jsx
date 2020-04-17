import React from "react";
import * as postAPI from "../../services/post-api";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import {Link} from 'react-router-dom';

const Post = ({ post, user, handleDeletedPost }) => {
  function doDelete(postId) {
    handleDeletedPost(postId);
  }
  console.log(post);
  console.log(post.authorRef);
  console.log(post.authorRef._id);
  return (
    <React.Fragment>
      <h3>{post.title}</h3>
      <p>{post.author}</p>
      <h4>{post.topic}</h4>
      <br />
      {post.content.map((content) => (
        <p key={content._id}>{content.data}</p>
      ))}
      {user && (user.isAdmin || user._id === post.authorRef) && (
        <>
          <Link
            className='btn btn-warning'
            to={{
              pathname: '/edit',
              state: {post}
            }}
          >
            Edit Post
          </Link>
          <DeleteButton
            label="Delete Post"
            itemId={post._id}
            api={postAPI}
            doDelete={doDelete}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Post;
