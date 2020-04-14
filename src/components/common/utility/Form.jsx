import { Component } from 'react';

class Form extends Component {
  state = { 
    data: {},
    errors: {}
  }

  joiOptions = {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  };
  
  validateForm = () => {
    const { error } = this.joiSchema.validate(this.state.data, this.joiOptions);
    if (!error) return null;
    const errors = {};
    error.details.forEach((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateField = ({ name, value }) => {
    const obj = { [name]: value };
    // strange voodoo magic
    const { error } = this.joiSchema.validate(obj, this.joiOptions);
    if (!error) return null;
    let message;
    error.details.forEach((item) => {
      if (name === item.path[0]) message = item.message;
    });
    return message ? message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit()
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
}
 
export default Form;