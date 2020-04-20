import React from "react";
import Joi from "@hapi/joi";
import FormUtility from "./utility/FormUtility";
import * as userAPI from "../../services/user-api";
import { Header, Icon, Segment } from "semantic-ui-react";

class SignupForm extends FormUtility {
  state = {
    data: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    name: Joi.string().required().label("Name").max(256),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email")
      .max(256),
    username: Joi.string().alphanum().required().label("Username").max(128),
    password: Joi.string().required().label("Password").min(16).max(128),
  });

  doSubmit = async () => {
    const { history, handleSignupOrLogin } = this.props;
    try {
      await userAPI.signup(this.state.data);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      // Successfully signed up - show the homepage
      history.push("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.setState({ submitError: err.message });
    }
  };

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit} className="ui form">
        <Segment.Group>
          <Segment>
            <Header Header size="large" textAlign="center" dividing>
              Sign up
            </Header>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Signup")}
          </Segment>
          {this.state.submitError && (
            <Segment color="red" inverted secondary attached="bottom">
              <Icon name="warning" />
              {this.state.submitError}
            </Segment>
          )}
        </Segment.Group>
      </form>
    );
  }
}

export default SignupForm;
