import React from "react";
import EditPostForm from "../../components/EditPostForm/EditPostForm"

const EditPostPage = (props) => {
  return (
    <>
      <h1>Edit {props.location.state.post.title}</h1>
      <EditPostForm {...props} />
    </>
  );
};

export default EditPostPage;