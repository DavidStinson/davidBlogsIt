import React from "react";
import SignupForm from "../../components/common/SignupForm";
import "./SignupPage.css";

const SignupPage = ({ handleSignupOrLogin, history }) => {
  return (
    <div className="SignupPage">
      <header>Signup Page</header>
      <div className="four wide column"></div>
      <div className="eight wide column">
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
      </div>
      <div className="four wide column"></div>
    </div>
  );
};

export default SignupPage;
