import React from "react";
import Joi from "@hapi/joi";
import Form from "../common/utility/Form";

class CreatePostForm extends Form {

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
    email: Joi.string().email({ tlds: {allow: false} }).required().label("Email").max(256),
    username: Joi.string().alphanum().required().label("Username").max(128),
    password: Joi.string().required().label("Password").min(16).max(128),
  });

  doSubmit = async () => {
    console.log("WOW YOU FILLED OUT A FORM, GOOD JOB")
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Signup")}
          {this.state.submitError ? <div>{this.state.submitError}</div> : null }
        </form>
      </div>
    )
  }
}
  


export default CreatePostForm;