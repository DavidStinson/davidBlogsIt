import React from "react";
import EditPostForm from "../../components/EditPostForm/EditPostForm"

const EditPostPage = (props) => {
  return (
    <div className="EditPostPage">
      <header>Edit a post</header>
      <EditPostForm {...props} />
    </div>
  );
};

export default EditPostPage;