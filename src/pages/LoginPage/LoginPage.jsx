import React, { Component } from 'react';
import './LoginPage.css';
import LoginForm from '../../components/common/LoginForm'

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        <header>Log In</header>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
