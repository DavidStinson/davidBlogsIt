import React from "react";
import Joi from "@hapi/joi";
import FormUtility from "../common/utility/FormUtility";
import * as postAPI from "../../services/post-api";
import { Segment, Header, Icon } from "semantic-ui-react"


class CreatePostForm extends FormUtility {
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
        <Segment.Group>
          <Segment>
            <Header size="huge">Create a new post</Header>
            {this.renderInput("title", "Title")}
            {this.renderInput("topic", "Topic")}
          </Segment>
          <Segment>
            {this.renderTextareaInput("content", "Content")}
            <div>{this.renderCheckbox("isHero", "Pin this post")}</div>
          </Segment>
          {this.state.submitError && (
            <Segment color="red" inverted secondary>
              <Icon name="warning" />
              {this.state.submitError}
            </Segment>
          )}
          <Segment clearing>
            <div>{this.renderButton("Post")}</div>
          </Segment>
        </Segment.Group>
      </form>
    );
  }
}

export default CreatePostForm;