import React from "react";
import FormUtility from "../common/utility/FormUtility";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import * as postAPI from "../../services/post-api";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

class EditPostForm extends FormUtility {
  state = {
    data: this.props.location.state.post,
    errors: {},
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topic: Joi.string().required().label("Topic").max(256),
    content: Joi.string().required().label("Content"),
    isHero: Joi.boolean().label("Is hero content"),
    date: Joi.string(),
    _id: Joi.string(),
    author: Joi.string(),
    authorRef: Joi.string(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    __v: Joi.number(),
  });

  doSubmit = async () => {
    const updatedPost = await postAPI.update(this.state.data);
    this.props.handleUpdatedPost(updatedPost);
  };

  render() {
    return (
      <div>
        <form
          autoComplete="off"
          onSubmit={this.handleSubmit}
          className=" ui form"
        >
          <Segment.Group>
            <Segment>
              <Header size="large" textAlign="center" dividing>
                Edit {this.props.location.state.post.title}
              </Header>
              {this.renderInput("title", "Title")}
              {this.renderInput("topic", "Topic")}
            </Segment>
            <Segment>
              <Container text>
                {this.renderReactMde(this.state.data.content)}
              </Container>
              <div>{this.renderCheckbox("isHero", "Pin this post")}</div>
            </Segment>
            <Button.Group widths="2">
              <Link className="ui button" to="/">
                CANCEL
              </Link>
              {this.renderButton("Save Post", "ui button primary")}
            </Button.Group>
            {this.state.submitError && (
              <Segment color="red" inverted secondary attached="bottom">
                <Icon name="warning" />
                {this.state.submitError}
              </Segment>
            )}
          </Segment.Group>
        </form>
      </div>
    );
  }
}

export default EditPostForm;
