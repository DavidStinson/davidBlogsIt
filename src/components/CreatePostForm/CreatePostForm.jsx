import React from "react";
import Joi from "@hapi/joi";
import Form from "../common/utility/Form";

class CreatePostForm extends Form {

  state = {
    data: {
      title: "",
      topic: "",
      isHero: false,
      content: ""
    },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topic: Joi.string().required().label("Topic").max(256),
    content: Joi.string().alphanum().required().label("Content"),
    isHero: Joi.boolean().truthy("checked").falsy("unchecked").label("Is hero content")
  });

  doSubmit = async () => {
    console.log("WOW YOU FILLED OUT A FORM, GOOD JOB")
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("topic", "Topic")}
          {this.renderInput("content", "Content")}
          {this.renderCheckbox("isHero", "Is hero content")}
          {this.renderButton("Post")}
          {this.state.submitError ? <div>{this.state.submitError}</div> : null }
        </form>
      </div>
    )
  }
}
  


export default CreatePostForm;