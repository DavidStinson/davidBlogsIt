import React from 'react';
import Post from "../../components/Post/Post"

const ListPostsPage = ({posts, user, handleDeletedPost}) => {
  return ( 
    <div>
      {posts.map((post) => 
        <Post
          key={post._id}
          post={post}
          user={user}
          handleDeletedPost={handleDeletedPost}
        />
        )}
    </div>
  );
}
 
export default ListPostsPage;