import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPost,
  updatePost,
  deletePost,
} from "../features/posts/postsSlice";

function PostModal({ post, onClose }) {
  const dispatch = useDispatch();
  const isEditing = !!post;

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("2026-09-14");
  const [time, setTime] = useState("10:00");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setPlatform(post.platform);

      const start = new Date(post.start);

      setDate(
        `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(start.getDate()).padStart(2, "0")}`
      );

      setTime(
        `${String(start.getHours()).padStart(2, "0")}:${String(
          start.getMinutes()
        ).padStart(2, "0")}`
      );
    }
  }, [post]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a post title");
      return;
    }

    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    if (isEditing) {
      dispatch(
        updatePost({
          ...post,
          title,
          platform,
          start,
          end,
        })
      );
    } else {
      dispatch(
        addPost({
          title,
          platform,
          start,
          end,
        })
      );
    }

    onClose();
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? "Edit Scheduled Post" : "Add New Post"}</h2>

        <label>Post Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />

        <label>Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>LinkedIn</option>
          <option>Twitter</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Post"}
          </button>

          {isEditing && (
            <button onClick={handleDelete}>Delete</button>
          )}

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;