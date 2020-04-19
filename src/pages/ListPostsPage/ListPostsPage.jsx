import React, { Component } from 'react';
import Post from "../../components/Post/Post"
import { Container, Segment } from "semantic-ui-react";

class ListPostsPage extends Component {
  state = {  }
  render() {
    const {posts, user, handleDeletedPost} = this.props
    return ( 
      <Container text>
      <Segment>
      {posts.slice(0).reverse().map((post) => 
        <Post
          key={post._id}
          post={post}
          user={user}
          handleDeletedPost={handleDeletedPost}
        />
        )}
        </Segment>
    </Container>
    );
  }
}
 
export default ListPostsPage;