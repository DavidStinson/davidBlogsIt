import React from "react";
import FormUtility from "../common/utility/FormUtility";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import * as topicAPI from "../../services/topic-api";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

class EditTopicsForm extends FormUtility {
  state = {
    data: [],
    errors: {},
    loaded: false,
  };

  joiSchema = Joi.object({
    topics: Joi.array().required().label("Topics").min(1),
    topic: Joi.string().required().label("Topic"),
    isHero: Joi.boolean().label("Is hero content"),
    date: Joi.string(),
    _id: Joi.string(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    __v: Joi.number(),
  });

  // doSubmit = async () => {
  //   const updatedTopic = await topicAPI.update(this.state.data);
  //   this.props.handleUpdatedTopic(updatedTopic);
  // };

  async componentDidMount() {
    const topics = await topicAPI.index();
    const data = { ...this.state.data, topics };
    this.setState({ loaded: true, data });
    console.log(this.state);
    console.log("^^^^^^ STATE");
  }

  handleTopicDelete = async (item) => {
    const { topics } = this.state.data;
    let itemId = "";
    topics.forEach((topic) => {
      if (topic.value === item) itemId = topic._id;
    });
    if (!itemId) this.setState({ submitError: "Could not find topic ID" });
    const deletedItem = await topicAPI.deleteOne(itemId);
    if (deletedItem) {
    this.setState({ topics: topics.filter((topic) => topic._id !== itemId) });
    } else {
      this.setState({ submitError: `Unable to delete ${item}. Existing posts reference this topic. Please remove this topic from any post it belongs to first.`});
    }
  };

  render() {
    const { topic } = this.state.data;
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
                Edit Topics
              </Header>
              {this.state.loaded
                ? this.renderSimpleDropdown(
                    "topic",
                    "Topic",
                    this.state.data.topics
                  )
                : this.renderLoadingInput("topic", "Topic")}
            </Segment>
            {this.state.submitError && (
              <Segment color="red" inverted secondary>
                <Icon name="warning" />
                {this.state.submitError}
              </Segment>
            )}
            <Button.Group widths="3" attached="bottom">
              <Link className="ui button" to="/">
                CANCEL
              </Link>
              {topic ? (
                <button
                  className="ui red button"
                  onClick={() => this.handleTopicDelete(topic)}
                >
                  Delete
                </button>
              ) : (
                <button className="ui red disabled button">Delete</button>
              )}

              {this.renderButton("Save Post", "ui button primary")}
            </Button.Group>
          </Segment.Group>
        </form>
      </div>
    );
  }
}

export default EditTopicsForm;
