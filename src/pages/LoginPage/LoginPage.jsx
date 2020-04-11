import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import * as userAPI from '../../services/user-api';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <header>Log In</header>
        <form onSubmit={this.handleSubmit} >
          <div>
            <input 
              type="email" 
              placeholder="Email"
              value={this.state.email} 
              name="email" 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <input 
              type="password"
              placeholder="Password" 
              value={this.state.pw} 
              name="pw" 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <button>Log In</button>
            &nbsp;&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
