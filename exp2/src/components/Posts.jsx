import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePost,
} from "../features/posts/postsSlice";
import { selectFilteredPosts } from "../features/posts/postsSelectors";

const PostItem = memo(function PostItem({ post, onDelete }) {
  return (
    <article className="post-card">
      <div className="post-icon">✦</div>

      <div className="post-content">
        <div className="post-title-row">
          <h3>{post.title}</h3>

          <span className="platform-tag">
            {post.platform}
          </span>
        </div>

        <p>{post.content}</p>

        <div className="post-bottom">
          <span
            className={`post-status ${post.status}`}
          >
            {post.status}
          </span>

          <button
            className="delete-btn"
            onClick={() => onDelete(post.id)}
          >
            Delete Post
          </button>
        </div>
      </div>
    </article>
  );
});

function Posts() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const posts = useSelector((state) =>
    selectFilteredPosts(state, searchTerm)
  );

  const postCount = useMemo(() => posts.length, [posts]);

  const handleAddPost = () => {
    dispatch(
      addPost({
        id: Date.now(),
        title: "New Post",
        content: "This post was added using Redux Toolkit.",
        platform: "Instagram",
        status: "draft",
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="section-label">CONTENT</p>
          <h2>Recent Posts</h2>
        </div>

        <button
          className="primary-btn"
          onClick={handleAddPost}
        >
          + Create Post
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts, platforms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <span>{postCount} posts found</span>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="empty-state">
          No posts found.
        </div>
      )}
    </section>
  );
}

export default Posts;