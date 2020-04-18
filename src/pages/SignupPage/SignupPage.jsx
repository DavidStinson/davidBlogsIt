import React from "react";
import SignupForm from "../../components/common/SignupForm";
import "./SignupPage.css";

const SignupPage = ({ handleSignupOrLogin, history }) => {
  return (
    <div className="ui grid">
      <div className="three wide column"></div>
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
      <div className="three wide column"></div>
    </div>
  );
};

export default SignupPage;
