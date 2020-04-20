import React, { Component } from "react";
import Post from "../../components/Post/Post";
import { Container, Header, Segment } from "semantic-ui-react";

class ListPostsPage extends Component {
  state = {};
  render() {
    const { posts, user, handleDeletedPost } = this.props;
    return (
      <Container text>
        <Header as="h1" textAlign="Center">David Blogs It.</Header>
        <p>Adventures in software engineering</p>
        <Segment raised>
          {posts
            .slice(0)
            .reverse()
            .map((post) => (
              <Post
                key={post._id}
                post={post}
                user={user}
                handleDeletedPost={handleDeletedPost}
              />
            ))}
        </Segment>
      </Container>
    );
  }
}

export default ListPostsPage;
