import React from "react";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm"

const CreatePostPage = ({user}) => {
  return (
    <div className="CreatePostPage">
      <header>Create a post</header>
      <CreatePostForm  user={user}/>
    </div>
  );
};

export default CreatePostPage;