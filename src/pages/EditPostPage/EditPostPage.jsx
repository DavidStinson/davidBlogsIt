import React from "react";
import EditPostForm from "../../components/EditPostForm/EditPostForm"

const EditPostPage = (props) => {
  return (
    <div className="EditPostPage">
      <h1>Edit {props.location.state.post.title}</h1>
      <EditPostForm {...props} />
    </div>
  );
};

export default EditPostPage;