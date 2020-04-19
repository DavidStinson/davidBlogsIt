import React from "react";
import * as postAPI from "../../services/post-api";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CodeBlockRenderUtility from "../common/utility/CodeBlockRenderUtility";
import { Container } from "semantic-ui-react";

const Post = ({ post, user, handleDeletedPost }) => {
  function doDelete(postId) {
    handleDeletedPost(postId);
  }

  return (
    <Container text>
      <h1 className="ui huge header">{post.title}</h1>
      <p>{post.author}</p>
      <h4>{post.topic}</h4>
      <br />
      <ReactMarkdown
        source={post.content}
        renderers={{ code: CodeBlockRenderUtility }}
      />

      {user && (user.isAdmin || user._id === post.authorRef) && (
        <>
          <Link
            className="ui inverted orange right labeled icon button"
            to={{
              pathname: "/edit",
              state: { post },
            }}
          >
            Edit Post
            <i className="pencil alternate icon"></i>
          </Link>
          <DeleteButton
            label="Delete Post"
            itemId={post._id}
            api={postAPI}
            doDelete={doDelete}
          />
        </>
      )}
    </Container>
  );
};

export default Post;
