import React, { Component } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import CodeBlockRenderUtility from "./CodeBlockRenderUtility";
import { Dropdown, Input } from "semantic-ui-react"
import "react-mde/lib/styles/css/react-mde-all.css";

class FormUtility extends Component {
  state = {
    data: {},
    errors: {},
    options: [],
    tab: "write",
  };

  joiOptions = {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  };

  validateForm = () => {
    const { error } = this.joiSchema.validate(this.state.data, this.joiOptions);
    console.log(error);
    console.log(
      "^^^^^^^^^^^^^^^^^^^ FORM VALIDATION ERROR ^^^^^^^^^^^^^^^^^^^"
    );
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

    this.doSubmit();
  };

  handleDropdownAddition = (event, input) => {
    const newOption = { text: input.value, value: input.value }
    this.doDropdownAddition(newOption)
  }

  handleErrors = (input) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    console.log(errorMessage)
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors })
  }

  handleInputChange = ({ target: input }) => {
    this.handleErrors(input)
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleDropdownChange = (event, input) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    this.handleErrors(input)
  }

  handleCheckboxChange = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.checked;
    this.setState({ data});
  };

  handleMdeChange = (value) => {
    const data = { ...this.state.data };
    data.content = value;
    this.setState({ data });
  };

  handleMdeTabChange = (tab) => {
    this.setState({ tab });
  };

  renderButton(label, className="ui primary right fluid button" ) {
    return (
      <button
        disabled={this.validateForm()}
        className={className}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", style = "") {
    const { data, errors } = this.state;
    const error = errors[name];
    return (
      <div className={error ? "error field required" : "field required"}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          value={data[name]}
          name={name}
          id={name}
          onChange={this.handleInputChange}
          className={style}
          placeholder={label}
        />
        {error && <div className="ui up pointing red basic label">{error}</div>}
      </div>
    );
  }

  renderTextareaInput(name, label, rows = 20) {
    const { data, errors } = this.state;
    const error = errors[name];
    console.log("hey are you still using this?")
    return (
      <div className={error ? "error field required" : "field required"}>
        <label htmlFor={name}>{label}</label>
        <textarea
          value={data[name]}
          name={name}
          id={name}
          onChange={this.handleInputChange}
          placeholder={label}
          rows={rows}
        />
        {error && <div className="ui up pointing red basic label">{error}</div>}
      </div>
    );
  }

  renderDropdownAllowAdditions(name, label) {
    const { data, errors, options } = this.state
    options.forEach(option => {
      delete option.createdAt
      delete option.updatedAt
    })
    const error = errors[name]
    return (
      <div className={error ? "error field required" : "field required"}>
      <label htmlFor={name}>{label}</label>
        <Dropdown
          name={name}
          options={options}
          placeholder={label}
          search
          selection
          fluid
          multiple
          allowAdditions
          additionLabel={<i style={{ color: 'red' }}>Add Topic: </i>}
          value={data[name]}
          onAddItem={this.handleDropdownAddition}
          onChange={this.handleDropdownChange}
        />
        {error && <div className="ui up pointing red basic label">{error}</div>}
      </div>
    )
  }

  renderCheckbox(name, label) {
    const { data } = this.state;
    return (
      <div className="ui inline field">
        <label htmlFor={name}>{label}</label>
        <input
          type="checkbox"
          checked={data[name]}
          name={name}
          id={name}
          onChange={this.handleCheckboxChange}
        />
      </div>
    );
  }

  renderReactMde(value) {
    return (
      <ReactMde
        value={value}
        onChange={this.handleMdeChange}
        selectedTab={this.state.tab}
        onTabChange={this.handleMdeTabChange}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown
              source={markdown}
              renderers={{ code: CodeBlockRenderUtility }}
            />
          )
        }
      />
    );
  }

  renderLoadingInput(name, label) {
    const { errors } = this.state
    const error = errors[name];
    return (
      <div className={error ? "error field required" : "field required"}>
        <label htmlFor={name}>{label}</label>
      <Input loading fluid disabled placeholder="Loading..." />
      {error && <div className="ui up pointing red basic label">{error}</div>}
      </div>
    )
  }
}

export default FormUtility;