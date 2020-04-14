import React, { Component } from 'react';
import SignupForm from "../../components/common/SignupForm";
import './SignupPage.css';

class SignupPage extends Component {
  render() {
    return (
      <div className='SignupPage'>
        <SignupForm />
      </div>
    );
  }
}

export default SignupPage;
