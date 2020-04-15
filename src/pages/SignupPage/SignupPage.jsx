import React from "react";
import SignupForm from "../../components/common/SignupForm";
import "./SignupPage.css";

const SignupPage = ({ handleSignupOrLogin, history }) => {
  return (
    <div className="SignupPage">
      <header>Signup Page</header>
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} history={history} />
    </div>
  );
};

export default SignupPage;
