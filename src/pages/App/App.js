import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import CreatePostPage from '../CreatePostPage/CreatePostPage'
import * as postAPI from '../../services/post-api';
import * as userAPI from '../../services/user-api';
import ListPostsPage from '../../pages/ListPostsPage/ListPostsPage'
import NavBar from '../../components/NavBar/NavBar'

class App extends Component {
  state = {
    // Initialize user if there's a token, otherwise null
    user: userAPI.getUser(),
    posts: []
  };

  /*--------------------------- Callback Methods ---------------------------*/

  handleLogout = () => {
    userAPI.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userAPI.getUser()});
  }

  handleSubmittedPost = (newPost) => {
    console.log(newPost)
    this.setState(state => ({
      posts:[...state.posts, newPost]
    }), () => this.props.history.push('/'))
  }

  /*-------------------------- Lifecycle Methods ---------------------------*/

  async componentDidMount() {
    const posts = await postAPI.index();
    console.log("mounted")
    this.setState({ posts });
  }

  /*-------------------------------- Render --------------------------------*/

  render() {
    const {user} = this.state
    return (
      <div className="App">
        <h1>Welcome to Post</h1>
        <NavBar
          user={user}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/new-post' render={(props) => 
            user ? 
              <CreatePostPage 
                user={user} 
                handleSubmittedPost={this.handleSubmittedPost} 
                {...props}
              />
            :
              <Redirect to='/login'/>
          }/>
          <Route exact path='/' render={() =>
            <ListPostsPage posts={this.state.posts} user={user}/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
