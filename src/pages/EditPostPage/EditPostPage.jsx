import React, {Component} from 'react';

const EditPostPage = ({location, }) => {
  return (
    <div className="CreatePostPage">
      <header>Create a post</header>
      <EditPostForm  user={user} handleSubmittedPost={handleSubmittedPost}/>
  </div>
  );
}
 
export default EditPostPage;



