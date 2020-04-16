import React from "react";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm"

const CreatePostPage = ({user, history}) => {
  return (
    <div className="CreatePostPage">
      <header>Create a post</header>
      <CreatePostForm  user={user} history={history}/>
    </div>
  );
};

export default CreatePostPage;