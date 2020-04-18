import React from "react";
import FormUtility from "../common/utility/FormUtility";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import * as postAPI from "../../services/post-api"

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
    this.props.handleUpdatedPost(updatedPost)
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("topic", "Topic")}
          {this.renderInput("content", "Content")}
          {this.renderCheckbox("isHero", "Is hero content")}
          <Link className='btn btn-warning mr-3'to='/'>CANCEL</Link>
          {this.renderButton("Save Post")}
          {this.state.submitError ? <div>{this.state.submitError}</div> : null }
        </form>
      </div>
    );
  }
}

export default EditPostForm;
