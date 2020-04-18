import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/common/LoginForm";

const LoginPage = ({ handleSignupOrLogin, history }) => {
  return (
    <div className="ui grid">
      <div className="three wide column"></div>
      <LoginForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
      <div className="three wide column"></div>
    </div>
  );
};

export default LoginPage;
