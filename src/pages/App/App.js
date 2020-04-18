import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
import * as postAPI from "../../services/post-api";
import * as userAPI from "../../services/user-api";
import ListPostsPage from "../../pages/ListPostsPage/ListPostsPage";
import NavBar from "../../components/NavBar/NavBar";
import EditPostPage from "../EditPostPage/EditPostPage";

class App extends Component {
  state = {
    // Initialize user if there's a token, otherwise null
    user: userAPI.getUser(),
    posts: [],
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
    console.log(newPost);
    this.setState(
      (state) => ({
        posts: [...state.posts, newPost],
      }),
      () => this.props.history.push("/")
    );
  };

  handleUpdatedPost = (updatedPost) => {
    const updatedPosts = this.state.posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    );
    this.setState(
      {posts: updatedPosts},
      () => this.props.history.push('/')
    );
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
    console.log("mounted");
    this.setState({ posts });
  }

  /*-------------------------------- Render --------------------------------*/

  render() {
    const { user } = this.state;
    const {
      handleLogout,
      handleSignupOrLogin,
      handleSubmittedPost,
      handleUpdatedPost,
      handleDeletedPost
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
            exact
            path="/new-post"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
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
            path="/edit"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return (
                <EditPostPage
                  handleUpdatedPost={handleUpdatedPost}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/"
            render={() => (
              <ListPostsPage
                posts={this.state.posts}
                user={user}
                handleDeletedPost={handleDeletedPost}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
