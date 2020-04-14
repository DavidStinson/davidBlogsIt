import React from "react";
import Input from "./Input";
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
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={data.username}
            handleChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={data.password}
            handleChange={this.handleChange}
            error={errors.password}
          />
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;