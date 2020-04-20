import React from "react";
import FormUtility from "../common/utility/FormUtility";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import * as postAPI from "../../services/post-api";
import * as topicAPI from "../../services/topic-api"
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

class EditPostForm extends FormUtility {
  state = {
    data: this.props.location.state.post,
    errors: {},
    loaded: false
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topicRefs: Joi.array().required().label("TopicRefs").min(1),
    topics: Joi.array().required().label("Topics").min(1),
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

  doDropdownAddition = async (value) => {
    const newTopic = await topicAPI.create(value);
    this.setState((state) => ({ options: [...state.options, newTopic] }));
  };

  async componentDidMount() {
    const { topicRefs } = this.props.location.state.post
    const topicOptions = await topicAPI.index();
    let topics = []
    for (const topicRef of topicRefs) {
      const existingTopic = await topicAPI.show(topicRef)
      topics.push(existingTopic.value)
    };
    const data = {...this.state.data}
    data.topics = topics
    this.setState({ options: topicOptions, loaded: true, data });
  }

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
              {this.state.loaded
                ? this.renderDropdownAllowAdditions("topics", "Topics")
                : this.renderLoadingInput("topics", "Topics")}
            </Segment>
            <Segment>
              <Container text>
                {this.renderReactMde(this.state.data.content)}
              </Container>
              <div>{this.renderCheckbox("isHero", "Pin this post")}</div>
            </Segment>
            {this.state.submitError && (
              <Segment color="red" inverted secondary>
                <Icon name="warning" />
                {this.state.submitError}
              </Segment>
            )}
            <Button.Group widths="2" attached="bottom">
              <Link className="ui button" to="/">
                CANCEL
              </Link>
              {this.renderButton("Save Post", "ui button primary")}
            </Button.Group>
          </Segment.Group>
        </form>
      </div>
    );
  }
}

export default EditPostForm;
