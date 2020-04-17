import React, { Component } from "react";

const EditPostPage = (props) => {
  return (
    <div className="EditPostPage">
      <header>Edit a post</header>
      <EditPostForm {...props} />
    </div>
  );
};

export default EditPostPage;

