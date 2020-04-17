import React from "react";
import Form from "../common/utility/Form";

class EditPostForm extends Form {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>The edit post component!</h1>
      </div>
    );
  }
}

export default EditPostForm;
