import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import CreatePostPage from '../CreatePostPage/CreatePostPage'
import * as postAPI from '../../services/post-api';
import * as userAPI from '../../services/user-api';
import Post from '../../components/Post/Post'
import NavBar from '../../components/NavBar/NavBar'

class App extends Component {
  state = {
    // Initialize user if there's a token, otherwise null
    user: userAPI.getUser(),
    posts: null
  };

  /*--------------------------- Callback Methods ---------------------------*/

  handleLogout = () => {
    userAPI.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userAPI.getUser()});
  }

  /*-------------------------- Lifecycle Methods ---------------------------*/

  async componentDidMount() {
    const posts = await postAPI.index();
    this.setState({ posts });
  }

  /*-------------------------------- Render --------------------------------*/

  render() {
    return (
      <div className="App">
        <h1>Welcome to Post</h1>
        <NavBar
          user={this.state.user}
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
          <Route exact path='/post-secret' render={() => 
            userAPI.getUser() ? 
              <CreatePostPage />
            :
              <Redirect to='/login'/>
          }/>
          <Route exact path='/' render={() =>
            <Post />
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
