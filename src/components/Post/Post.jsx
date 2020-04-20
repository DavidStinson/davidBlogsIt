import React from "react";
import * as postAPI from "../../services/post-api";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CodeBlockRenderUtility from "../common/utility/CodeBlockRenderUtility";
import { Comment, Divider, Header } from "semantic-ui-react";

const Post = ({ post, user, handleDeletedPost }) => {
  function doDelete(postId) {
    handleDeletedPost(postId);
  }

  function allowNode(node, idx) {
    if (idx > 1) return false;
    return true;
  }

  return (
    <>
      <Link to={{ pathname: "/post", state: { post } }}>
        <Header size="huge" className="ib">
          {post.title}
        </Header>
      </Link>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="https://i.imgur.com/ZIMoZ4P.jpg" />
          <Comment.Content>
            <Comment.Author as="span">{post.author}</Comment.Author>
            <Comment.Metadata>
              <span>{post.date}</span>
            </Comment.Metadata>
            <Comment.Text>{post.topicsString}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
      <ReactMarkdown
        source={post.content}
        renderers={{ code: CodeBlockRenderUtility }}
        allowNode={allowNode}
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
      <Divider section />
    </>
  );
};

export default Post;
