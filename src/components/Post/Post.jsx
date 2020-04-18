import React from "react";
import * as postAPI from "../../services/post-api";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import {Link} from 'react-router-dom';

const Post = ({ post, user, handleDeletedPost }) => {
  function doDelete(postId) {
    handleDeletedPost(postId);
  }

  return (
    <React.Fragment>
      <h1 className="ui huge header">{post.title}</h1>
      <p>{post.author}</p>
      <h4>{post.topic}</h4>
      <br />
      <p>{post.content}</p>
      
      {user && (user.isAdmin || user._id === post.authorRef) && (
        <>
          <Link
            className='ui inverted orange right labeled icon button'
            to={{
              pathname: '/edit',
              state: {post}
            }}
          >
            Edit Post
            <i class="pencil alternate icon"></i>
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