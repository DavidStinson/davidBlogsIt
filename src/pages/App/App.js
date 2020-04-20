import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import * as postAPI from "../../services/post-api";
import * as topicAPI from "../../services/topic-api";
import * as userAPI from "../../services/user-api";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
import ListPostsPage from "../../pages/ListPostsPage/ListPostsPage";
import EditPostPage from "../EditPostPage/EditPostPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import TopicsPage from "../TopicsPage/TopicsPage";
import ViewPostPage from "../ViewPostPage/ViewPostPage";
import NavBar from "../../components/NavBar/NavBar";
import { Container, Placeholder, Segment } from "semantic-ui-react";

class App extends Component {
  state = {
    // Initialize user if there's a token, otherwise null
    user: userAPI.getUser(),
    posts: [],
    topics: [],
    loaded: false,
  };

  /*--------------------------- Callback Methods ---------------------------*/

  handleLogout = () => {
    userAPI.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userAPI.getUser() });
  };

  handleSubmittedPost = (newPost) => {
    this.setState(
      (state) => ({ posts: [...state.posts, newPost] }),
      () => this.props.history.push("/")
    );
  };

  handleUpdatedPost = (updatedPost) => {
    const updatedPosts = this.state.posts.map((post) =>
      post._id === updatedPost._id ? updatedPost : post
    );
    this.setState({ posts: updatedPosts }, () => this.props.history.push("/"));
  };

  handleDeletedPost = (postId) => {
    this.setState(
      (state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }),
      () => this.props.history.push("/")
    );
  };

  /*-------------------------- Lifecycle Methods ---------------------------*/

  async componentDidMount() {
    const posts = await postAPI.index();
    for (const post of posts) {
      let postTopics = [];
      for (const topicRef of post.topicRefs) {
        const postTopic = await topicAPI.show(topicRef);
        if (postTopic) postTopics.push(postTopic.value);
      }
      post.topicsString = postTopics.join(", ");
      console.log(post);
    }
    const topics = await topicAPI.index();
    this.setState({ posts, topics, loaded: true });
  }

  /*-------------------------------- Render --------------------------------*/

  render() {
    const { user } = this.state;
    const {
      handleLogout,
      handleSignupOrLogin,
      handleSubmittedPost,
      handleUpdatedPost,
      handleDeletedPost,
    } = this;
    return (
      <div className="ui container">
        <h1>Welcome to Post</h1>
        <NavBar user={user} handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginPage {...props} handleSignupOrLogin={handleSignupOrLogin} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <SignupPage
                {...props}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            )}
          />
          <Route
            path="/new-post"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              if (!user.isAdmin) return <Redirect to="/404" />;
              return (
                <CreatePostPage
                  user={user}
                  handleSubmittedPost={handleSubmittedPost}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/post"
            render={(props) => {
              return (
                <ViewPostPage
                  handleDeletedPost={handleDeletedPost}
                  user={user}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/edit"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              if (!user.isAdmin) return <Redirect to="/404" />;
              return (
                <EditPostPage
                  handleUpdatedPost={handleUpdatedPost}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/topics"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              if (!user.isAdmin) return <Redirect to="/404" />;
              return <TopicsPage {...props} />;
            }}
          />
          <Route path="/404" component={NotFoundPage} />
          <Route
            exact
            path="/"
            render={() =>
              this.state.loaded ? (
                <ListPostsPage
                  posts={this.state.posts}
                  user={user}
                  handleDeletedPost={handleDeletedPost}
                />
              ) : (
                <Container text>
                  <Segment raised>
                    <Placeholder fluid>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Segment>
                </Container>
              )
            }
          />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default App;
