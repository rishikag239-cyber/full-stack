import { memo } from "react";

function Toolbar({ postCount, onAddPost }) {
  return (
    <div className="toolbar">
      <div>
        <h1>Social Media Scheduler</h1>
        <p>Plan, schedule and manage your posts</p>
      </div>

      <div>
        <button className="add-button" onClick={onAddPost}>
          + Add New Post
        </button>

        <div className="post-count">
          {postCount} Scheduled Posts
        </div>
      </div>
    </div>
  );
}

export default memo(Toolbar);