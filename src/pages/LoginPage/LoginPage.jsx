import React, { Component } from "react";
import "./LoginPage.css";
import LoginForm from "../../components/common/LoginForm";

const LoginPage = ({ handleSignupOrLogin, history }) => {
  return (
    <div className="LoginPage">
      <header>Log In</header>
      <LoginForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
    </div>
  );
};

export default LoginPage;
