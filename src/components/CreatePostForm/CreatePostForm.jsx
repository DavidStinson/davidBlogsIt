import React from "react";
import Joi from "@hapi/joi";
import Form from "../common/utility/Form";
import * as postAPI from "../../services/post-api"

class CreatePostForm extends Form {
  
  state = {
    posts: [{}],
    data: {
      title: "",
      topic: "",
      isHero: false,
      content: [{
        content: ""
      }
      ]
    },
    errors: {},
    submitError: "",
  };

  joiSchema = Joi.object({
    title: Joi.string().required().label("Title").max(256),
    topic: Joi.string().required().label("Topic").max(256),
    content: Joi.array().label("Content"),
    isHero: Joi.boolean().truthy("checked").falsy("unchecked").label("Is hero content")
  });

  doSubmit = async () => {
    const newPost = await postAPI.create(this.state.data);
    this.setState(state => ({
      posts: [...state.posts, newPost]
    }), () => this.props.history.push('/'));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("topic", "Topic")}
          {this.renderContentInput("content", "Content")}
          {this.renderCheckbox("isHero", "Is hero content")}
          {this.renderButton("Post")}
          {this.state.submitError ? <div>{this.state.submitError}</div> : null }
        </form>
      </div>
    )
  }
}
  


export default CreatePostForm;