import React from 'react';
import Post from "../../components/Post/Post"

const ListPostsPage = ({posts, user}) => {
  return ( 
    <div>
      {posts.map((post) => 
            <Post
                key={post._id}
                post={post}
                user={user}
            />
        )}
    </div>
  );
}
 
export default ListPostsPage;