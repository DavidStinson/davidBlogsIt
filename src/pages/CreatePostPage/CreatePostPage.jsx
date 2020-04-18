import React from "react";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm"

const CreatePostPage = ({user, handleSubmittedPost}) => {
  return (
    <>
      <CreatePostForm  user={user} handleSubmittedPost={handleSubmittedPost}/>
    </>
  );
};

export default CreatePostPage;