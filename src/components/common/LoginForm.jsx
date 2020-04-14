import React from "react";
import Joi from "@hapi/joi";
import Form from "./utility/Form"

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  joiSchema = Joi.object({
    username: Joi.string().required().label("Username").min(3),
    password: Joi.string().required().label("Password"),
  });
  
  doSubmit() {
    //Call the server
    console.log("Submitted!");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;