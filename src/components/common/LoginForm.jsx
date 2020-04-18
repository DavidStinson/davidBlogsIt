import React from "react";
import Joi from "@hapi/joi";
import Form from "./utility/Form";
import * as userAPI from "../../services/user-api";

class LoginForm extends Form {
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
      console.log(err);
      this.setState({ submitError: "Invalid Credentials!" });
    }
  };

  render() {
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className="ui form ten wide column"
      >
        <div className="ui raised segments">
          <div className="ui segment">
            <h2 className="ui dividing centered header">Login</h2>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className="ui clearing segment">
            {this.renderButton("Login")}
          </div>

          {this.state.submitError ? <div>{this.state.submitError}</div> : null}
        </div>
      </form>
    );
  }
}

export default LoginForm;