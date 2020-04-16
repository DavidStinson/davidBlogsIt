import React from "react";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm"

const CreatePostPage = ({user, handleSubmittedPost}) => {
  return (
    <div className="CreatePostPage">
      <header>Create a post</header>
      <CreatePostForm  user={user} handleSubmittedPost={handleSubmittedPost}/>
    </div>
  );
};

export default CreatePostPage;