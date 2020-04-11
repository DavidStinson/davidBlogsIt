import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import TktksSecretPage from '../TktksSecretPage/TktksSecretPage'
import * as tktkAPI from '../../services/tktk-api';
import * as userAPI from '../../services/user-api';
import Tktk from '../../components/Tktk/Tktk'
import NavBar from '../../components/NavBar/NavBar'

class App extends Component {
  state = {
    // Initialize user if there's a token, otherwise null
    user: userAPI.getUser(),
    tktks: null
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
    const tktks = await tktkAPI.index();
    this.setState({ tktks });
  }

  /*-------------------------------- Render --------------------------------*/

  render() {
    return (
      <div className="App">
        <h1>Welcome to Tktk</h1>
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
          <Route exact path='/tktk-secret' render={() => 
            userAPI.getUser() ? 
              <TktksSecretPage />
            :
              <Redirect to='/login'/>
          }/>
          <Route exact path='/' render={() =>
            <Tktk />
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
