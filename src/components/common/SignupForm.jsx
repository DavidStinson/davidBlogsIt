import React from "react";
import Joi from "@hapi/joi";
import Form from "./utility/Form";

class SignupForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    errors: {},
  };

  joiSchema = Joi.object({
    name: Joi.string().required().label("Name").max(256),
    email: Joi.string().email({ tlds: {allow: false} }).required().label("Email").max(256),
    username: Joi.string().required().label("Username").max(128),
    password: Joi.string().required().label("Password").min(16).max(128),
  });

  doSubmit() {
    //Call the server
    console.log("Submitted!");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Signup")}
        </form>
      </div>
    );
  }
}

export default SignupForm;
