import React from "react";
import Joi from "@hapi/joi";
import Form from "./utility/Form"
import * as userAPI from "../../services/user-api"

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: false} }).required().label("Email").max(256),
    password: Joi.string().required().label("Password"),
  });
  
  doSubmit = async () => {
    const {history, handleSignupOrLogin} = this.props
    try {
      await userAPI.login(this.state);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      // Successfully signed up - show GamePage
      history.push('/');
    } catch (err) {
      console.log(err)
      // Use a modal or toast in your apps instead of alert
      this.setState({submitError: "Invalid Credentials!"})
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          {this.state.submitError ? <div>{this.state.submitError}</div> : null }
        </form>
      </div>
    );
  }
}

export default LoginForm;