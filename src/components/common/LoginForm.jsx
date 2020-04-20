import React from "react";
import Joi from "@hapi/joi";
import FormUtility from "./utility/FormUtility";
import * as userAPI from "../../services/user-api";
import { Header, Icon, Segment } from "semantic-ui-react";

class LoginForm extends FormUtility {
  state = {
    data: { email: "", password: "" },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email")
      .max(256),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    const { history, handleSignupOrLogin } = this.props;
    try {
      await userAPI.login(this.state);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      history.push("/");
    } catch (err) {
      this.setState({ submitError: "Invalid credentials, try again." });
    }
  };

  render() {
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className="ui form ten wide column"
      >
        <Segment.Group>
          <Segment>
            <Header size="large" textAlign="center" dividing>
              Login
            </Header>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
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

export default LoginForm;
