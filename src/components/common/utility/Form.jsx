import React, { Component } from 'react';

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
    console.log(error)
    console.log("^^^^^^^^^^^^^^^^^^^ FORM VALIDATION ERROR ^^^^^^^^^^^^^^^^^^^")
    if (!error) return null;
    const errors = {};
    error.details.forEach((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateField = ({ name, value }) => {
    const obj = { [name]: value };
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

  handleInputChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleContentInputChange = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data.content[0].content = input.value;
    this.setState({ data, errors });
  };

  handleCheckboxChange = ({ target: input }) => {
    const data = {...this.state.data };
    const errors = { ...this.state.errors }
    data[input.name] = input.checked
    this.setState({ data, errors })
  }

  renderButton(label){
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    )
  }

  renderInput(name, label, type = "text", autocomplete = "off"){
    const { data, errors } = this.state;
    const error = errors[name]
    return (
      <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={data[name]}
        name={name}
        id={name}
        onChange={this.handleInputChange}
        className="form-control"
        autoComplete={autocomplete}
      />
      <div>{error && <div className="alert alert-danger">{error}</div>}</div>
    </div>
    )
  }

  renderContentInput(name, label, type = "text", autocomplete = "off"){
    const { content } = this.state.data.content[0];
    return (
      <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={content}
        name={name}
        id={name}
        onChange={this.handleContentInputChange}
        className="form-control"
        autoComplete={autocomplete}
      />
    </div>
    )
  }
  
  renderCheckbox(name, label,) {
    const { data } = this.state
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type="checkbox"
          checked={data[name]}
          name={name}
          id={name}
          onChange={this.handleCheckboxChange}
          className="form-check"
        />
      </div>
    )
  }
}
 
export default Form;