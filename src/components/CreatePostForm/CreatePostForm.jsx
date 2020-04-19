import React from "react";
import Joi from "@hapi/joi";
import FormUtility from "../common/utility/FormUtility";
import * as postAPI from "../../services/post-api";
import * as topicAPI from "../../services/topic-api"
import { Container, Header, Icon, Segment } from "semantic-ui-react";

class CreatePostForm extends FormUtility {
  state = {
    data: {
      title: "",
      topic: [],
      isHero: false,
      content: "",
    },
    errors: {},
    submitError: "",
    options: this.props.topicOptions
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topic: Joi.array().required().label("Topic"),
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

  doDropdownAddition = async (value) => {
    const newTopic = await topicAPI.create(value)
    this.props.handleTopicAddition(newTopic)
  }


  static getDerivedStateFromProps(props, state) {
    console.log("this runs")
    if (props.topicOptions.length !== state.options.length) {
      return {options: props.topicOptions}
    } else {
      return null
    }
  }

  componentDidMount() {
    console.log("createPostForm is mounting")
    console.log(this.props)
    console.log(this.props.topicOptions)
    console.log("state is set with these ^")
    this.setState({options: this.props.topicOptions})
    console.log(this.setState.options)
    console.log("options put into state")
  }

  render() {
    console.log(this.state.options)
    console.log(this.state.data)
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit} className="ui form">
        <Segment.Group>
          <Segment>
            <Header size="large" textAlign="center" dividing>
              Create a new post
            </Header>
            {this.renderInput("title", "Title")}
            {this.renderDropdownAllowAdditions("topic", "Topic")}
          </Segment>
          <Segment>
            <Container text>
              {this.renderReactMde(this.state.data.content)}
            </Container>
            <div>{this.renderCheckbox("isHero", "Pin this post")}</div>
          </Segment>
          <Segment clearing>
            <div>{this.renderButton("Post")}</div>
          </Segment>
          {this.state.submitError && (
            <Segment color="red" inverted secondary attached="bottom">
              <Icon name="warning" />
              {this.state.submitError}
            </Segment>
          )}
        </Segment.Group>
      </form>
    );
  }
}

export default CreatePostForm;
