import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CodeBlockRenderUtility from "../common/utility/CodeBlockRenderUtility";
import { Comment, Divider, Header } from "semantic-ui-react";

const Post = ({ post, user, handleDeletedPost }) => {

  function allowNode(node, idx) {
    if (idx > 1) return false;
    return true;
  }

  return (
    <>
      <Link to={{ pathname: "/post", state: { post } }}>
        <Header size="large" className="ib">
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
            {user && (user.isAdmin || user._id === post.authorRef) && (
              <Link
                className="ui inverted orange right floated labeled icon button"
                to={{
                  pathname: "/edit",
                  state: { post },
                }}
              >
                Edit Post
                <i className="pencil alternate icon"></i>
              </Link>
            )}
            <Comment.Text>{post.topicsString}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
      <ReactMarkdown
        source={post.content}
        renderers={{ code: CodeBlockRenderUtility }}
        allowNode={allowNode}
      />
      <Link to={{ pathname: "/post", state: { post } }}>
        <Header size="small">
          Keep reading ...
        </Header>
      </Link>
      <Divider section />
    </>
  );
};

export default Post;