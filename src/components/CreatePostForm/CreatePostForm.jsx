import React from "react";
import Joi from "@hapi/joi";
import Form from "../common/utility/Form";
import * as postAPI from "../../services/post-api";

class CreatePostForm extends Form {
  state = {
    data: {
      title: "",
      topic: "",
      isHero: false,
      content: "",
    },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topic: Joi.string().required().label("Topic").max(256),
    content: Joi.string().required().label("Content"),
    isHero: Joi.boolean()
      .truthy("checked")
      .falsy("unchecked")
      .label("Pin this post"),
  });

  doSubmit = async () => {
    const newPost = await postAPI.create(this.state.data);
    this.props.handleSubmittedPost(newPost);
  };

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit} className="ui form">
        <div className="ui raised segments">
          <div className="ui segment">
            <h2 className="ui dividing centered header">Create a new post</h2>
            {this.renderInput("title", "Title")}
            {this.renderInput("topic", "Topic")}
          </div>
          <div className="ui segment">
            {this.renderTextareaInput("content", "Content")}
            <div>{this.renderCheckbox("isHero", "Pin this post")}</div>
          </div>
          <div className="ui clearing segment">
            <div>{this.renderButton("Post")}</div>
          </div>
          {this.state.submitError ? (
            <div className="ui bottom attached error message">
              <i className="warning icon"></i>
              {this.state.submitError}
            </div>
          ) : null}
        </div>
      </form>
    );
  }
}

export default CreatePostForm;