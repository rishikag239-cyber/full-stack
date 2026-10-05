import { useSelector } from "react-redux";

function PostList() {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div>
      <h2>Posts</h2>

      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

export default PostList;